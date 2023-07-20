import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}
public jwtToken = {access_token: ''}; 
@UseGuards(AuthGuard('local'))
@Post('auth/login')
async login (@Req() req) {
    return this.authService.login(req.user);
}


@UseGuards(AuthGuard('google'))
@Get('google')
async google() {}


@UseGuards(AuthGuard('google'))
@Get('auth/google/callback')
async googleCallback(@Req() req, @Res() res: Response) {
  // return req.user;
  // return this.authService.login(req.user);
  // console.log(req.user);
  const jwt = await this.authService.login(req.user);
  this.jwtToken = jwt;
  res.set('authorization', jwt.access_token);
  res.status(200);
  return res.json(req.user);
  // res.redirect('/profile', )
}



@UseGuards(AuthGuard('google'))
@Get('home')
async getHome(@Req() req, @Res() res: Response) {
  // console.log('token--->>',this.jwtToken.access_token)
  if(this.jwtToken.access_token) {
    res.json({data: {}})
  } else {
    res.json({})
  }
}

// need more research
@Get('logout')
async logout(@Req() req, @Res() res) {
  const jwt = await this.authService.login('');
  this.jwtToken = jwt;
  return 'successfully logout'
}


@UseGuards(AuthGuard('google'))
@Get('google')
async Google(@Req() req) {}

@Get('auth/google/callback')
@UseGuards(AuthGuard('google'))
async callback(@Req() req, @Res() res) {
  console.log('done')
  res.json(req.user);
}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
