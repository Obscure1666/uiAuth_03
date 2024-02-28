import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

import { NuxtAuthHandler } from '#auth';

// @ts-ignore
import bcrypt from 'bcrypt'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,  
  pages: {
    signIn: '/auth/login'
  },
  session: {
      strategy: 'jwt'
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
      },
      async authorize (credentials: any) {
        const userRepository = AppDataSource.getRepository(userAuth);
        const authUser = await userRepository.findOne({
          where: {
            username: credentials?.username,
          }
        });
        const correctPass = await bcrypt.compare(
          credentials.password,
          authUser.password
        );
        if (!correctPass) {
          console.log('incorrect')
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
          })
        } else {
          return authUser
          console.log('CorrectPass')
        }
      }
    })
  ]
})