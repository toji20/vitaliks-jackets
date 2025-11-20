// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name: string;
      image: string;
    };
  }

  interface User extends DefaultUser {
    id: number;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
  }
}

import { DesignProjectContent as PrismaDesignProjectContent, JsonValue } from '@prisma/client'

export type DesignProjectContent = PrismaDesignProjectContent

export interface SaveContentData {
  title?: string
  subtitle?: string
  content?: JsonValue
}

export interface ContentField {
  section: string
  title?: string | null
  subtitle?: string | null
  content?: JsonValue | null
}

export type SeedData = {
  section: string
  title?: string | null
  subtitle?: string | null
  content?: JsonValue | null
}