import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationsService } from './authorizations.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../helpers/roles.enum';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorizations')
@Controller('authorizations')
export class AuthorizationsController {
  constructor(private readonly authorizationsService: AuthorizationsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: {
        user: 'd6ad3fe7-d313-448e-bae6-1ea4427b0fcd',
        type: 'guest',
        name: 'Fernando Perez',
        document: 50345678,
        shipmentNumber: '5678',
        accessCode: '5622',
        expirationTime: '2024-05-23T05:32:19.022Z',
        dateGenerated: '2024-05-23T03:32:19.023Z',
        guardId: null,
        dateUsed: null,
        id: '778b058a-8062-4782-8ac9-7c2572541c9c',
        number: 1,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: {
        user: '5ccae5a2-62fa-420f-8fa8-7c1ac211ef3e',
        type: 'delivery',
        name: 'Amazon',
        document: 50345587,
        shipmentNumber: '3247',
        accessCode: '4828',
        expirationTime: '2024-05-23T05:34:53.763Z',
        dateGenerated: '2024-05-23T03:34:53.764Z',
        guardId: null,
        dateUsed: null,
        id: '315fa4ad-aa39-42f4-bf04-ff0eeb555036',
        number: 1,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    schema: {
      example: {
        message: 'El tipo de autorizacion ingresado no es correcto',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Post(':id')
  @Roles(Role.Admin, Role.Owner, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  createNewAuthorization(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAuthorizationDto: CreateAuthorizationDto,
  ) {
    return this.authorizationsService.createAuthorization(
      id,
      createAuthorizationDto,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: [
        {
          id: 'ac424e1e-7405-4b79-966a-79c4acc15969',
          number: 1,
          user: '781c1a70-4b57-4c42-b629-b1c531183639',
          type: 'guest',
          name: 'Fernando Perez',
          document: 50345678,
          shipmentNumber: '5678',
          accessCode: 9493,
          expirationTime: '2024-05-23T05:48:37.754Z',
          dateGenerated: '2024-05-23T03:48:37.755Z',
          guardId: null,
          dateUsed: null,
        },
      ],
    },
  })
  @Get()
  @Roles(Role.Admin, Role.Security, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.authorizationsService.findAllAuthorizations();
  }

  @ApiBearerAuth()
<<<<<<< HEAD
  @Get('user/:id')
  @Roles(Role.Admin, Role.Owner, Role.SuperAdmin)
=======
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      example: {
        id: '4806c5ee-11d0-4604-a335-90357ace955c',
        number: 1,
        user: '2a8cb7d7-881f-479e-bd3b-1e844d5be2f2',
        type: 'guest',
        name: 'Fernando Perez',
        document: 50345678,
        shipmentNumber: '5678',
        accessCode: 9992,
        expirationTime: '2024-05-23T05:52:37.017Z',
        dateGenerated: '2024-05-23T03:52:37.018Z',
        guardId: null,
        dateUsed: null,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        message: 'No se encuentra una autorizacion con ese numero ingresado.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get(':number')
  @Roles(Role.Admin, Role.SuperAdmin)
>>>>>>> feature/validate-google
  @UseGuards(AuthGuard, RolesGuard)
  findAllByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authorizationsService.findAllAuthorizationsByUser(id);
  }

  @ApiBearerAuth()
  @Get(':code')
  @Roles(Role.Admin, Role.SuperAdmin, Role.Security)
  @UseGuards(AuthGuard, RolesGuard)
  findOneAuthorization(@Param('code') code: string) {
    return this.authorizationsService.findOneAuthorization(code);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      example: {
        message: `Autorización validada con exito`,
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: `El código de autorization ha expirado, por favor genere otro.`,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    schema: {
      example: {
        message: `No se encuentra una autorizacion con ese numero ingresado.`,
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Put(':id')
  @Roles(Role.Admin, Role.Security, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  validateAuthorization(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthorizationDto: UpdateAuthorizationDto,
  ) {
    return this.authorizationsService.validateAuthorization(
      id,
      updateAuthorizationDto,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      example: {
        message:
          'Autorización numero ${authorization.number} eliminada con éxito.',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    schema: {
      example: {
        message: 'No se encuentra una autorizacion con es numero ingresado.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteAuthorization(@Param('id', ParseUUIDPipe) id: string, code: string) {
    return this.authorizationsService.deleteAuthorization(id, code);
  }
}
