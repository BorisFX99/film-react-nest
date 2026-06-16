import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import OrdersRepository from '../repository/typeorm.orders.repository';
import FilmsRepository from '../repository/typeorm.films.repository';

@Injectable()
export class OrderService {
  private orderSeatFormat = (row, seat) => `${row}:${seat}`;

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const ticketsToUpdate = [];

    // 1. Проверяем каждый билет
    for (const ticket of createOrderDto.tickets) {
      // Ищем фильм по ID
      const searchedFilm = await this.filmsRepository.findFilmById(ticket.film);

      if (!searchedFilm) {
        throw new NotFoundException(`Film with ID ${ticket.film} not found`);
      }

      // Ищем нужную сессию в расписании фильма
      const session = searchedFilm.schedule?.find(
        (s) => s.id === ticket.session,
      );

      if (!session) {
        throw new NotFoundException(
          `Session ${ticket.session} at ${ticket.daytime} not found for film ${ticket.film}`,
        );
      }

      // Проверяем, не занято ли место
      const seatKey = this.orderSeatFormat(ticket.row, ticket.seat);
      if (session.taken?.includes(seatKey)) {
        throw new BadRequestException(
          `Seat ${ticket.row}:${ticket.seat} is already taken for session ${ticket.session}`,
        );
      }

      ticketsToUpdate.push({
        filmId: ticket.film,
        sessionId: ticket.session,
        daytime: ticket.daytime,
        seatKey: seatKey,
      });
    }

    // 2. Сохраняем заказ в БД (репозиторий)
    const savedTickets = await this.ordersRepository.create({
      email: createOrderDto.email,
      phone: createOrderDto.phone,
      tickets: createOrderDto.tickets,
    });

    // 3. Обновляем занятые места (репозиторий)
    for (const update of ticketsToUpdate) {
      await this.filmsRepository.addTakenSeat(
        update.filmId,
        update.sessionId,
        update.daytime,
        update.seatKey,
      );
    }

    // 4. Возвращаем ответ
    return {
      total: savedTickets.length,
      items: savedTickets,
    };
  }
}
