import { PrismaClient } from '@prisma/client'
import * as runtime from '@prisma/client/runtime/library.js'

export type PrismaTransaction = Omit<PrismaClient, runtime.ITXClientDenyList>
