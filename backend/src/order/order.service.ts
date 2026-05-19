import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { OrdersRepository } from '../repository/mongo.orders.repository';
import FilmsRepository from '../repository/mongo.films.repository';

@Injectable()
export class OrderService {
  private orderSeatFormat = (row, seat) => `${row}:${seat}`;

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const ticketsToUpdate = []; // коллекция для обновления мест

    // 1. Проверяем каждый билет (иду по dto)
    for (const ticket of createOrderDto.tickets) {
      // Ищем фильм по ID
      const searchedFilm = await this.filmsRepository.findFilmById(ticket.film);

      if (!searchedFilm) {
        throw new NotFoundException(`Film with ID ${ticket.film} not found`);
      }

      // Ищем нужную сессию в расписании фильма
      const session = searchedFilm.schedule?.find(
        (s) => s.id === ticket.session && s.daytime === ticket.daytime,
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

      // Запоминаем место для бронирования (рука не поднялась не обновить базу)
      ticketsToUpdate.push({
        filmId: ticket.film,
        sessionId: ticket.session,
        daytime: ticket.daytime,
        seatKey: seatKey,
      });
    }

    // Генерируем id для билетов
    const ticketsWithIds = createOrderDto.tickets.map((ticket) => ({
      ...ticket,
      id: uuidv4(),
    }));

    // Сохраняю заказ в БД
    const savedTickets = await this.ordersRepository.create({
      email: createOrderDto.email,
      phone: createOrderDto.phone,
      tickets: ticketsWithIds,
    });

    // теперь обновляем занятые места в фильмах
    for (const update of ticketsToUpdate) {
      await this.filmsRepository.addTakenSeat(
        update.filmId,
        update.sessionId,
        update.daytime,
        update.seatKey,
      );
    }

    // 4. Возвращаем ответ в нужном формате
    return {
      total: savedTickets.length,
      items: savedTickets,
    };
  }

  //   const mappedOrder = {
  //     ...createOrderDto,
  //     tickets: createOrderDto.tickets.map(ticket => ({
  //       ...ticket,
  //       id: uuidv4(),
  //     }))
  //   }
  // }

  // findAll() {
  //   return `This action returns all order`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
