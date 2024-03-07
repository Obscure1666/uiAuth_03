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
  callbacks: {
    jwt: async({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).accessToken || '' : '';
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
        token.username = user ? (user as any).username || '' : '';
      }
      return Promise.resolve(token);
    },
    session: async ({session, token}) => {
      (session as any).role = token.role;
      (session as any).username = token.username;
      (session as any).uid = token.id;
      return Promise.resolve(session);
    },
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
        // username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
        // password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
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
          if (credentials.is_active = true) {
            await AppDataSource.createQueryBuilder().update(userAuth).set({ last_login: Date() }).where("username = :username", { username: credentials.username }).execute();          
            return authUser          
          } else {
            console.log('inactive user')
            throw createError({
              statusCode: 401,
              statusMessage: 'User is Inactive'
            })
          }          
        }
      }
    })
  ]
})