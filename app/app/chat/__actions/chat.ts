'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createChat = async ( userId: string, messages: any) => {
  try {
    const newData = await prisma.history.create({
      data: {
        title: messages[0].content,
        userId: userId,
        messages: JSON.stringify(messages),
      },
    });

    return newData.id
  } catch (e) {
    console.error(e);
  }
};

export const updateChat = async (historyId: string, messages: any) => {
  try {
    await prisma.history.update({
        where: {
            id: historyId,
        },
        data: {
            messages: JSON.stringify(messages),
        },
        });
  } catch (e) {
    console.error(e);
  }
};

export const getMessages = async (historyId:string) =>{
  try {
    const messages = await prisma.history.findUnique({
      where: {
        id: historyId,
      }, select: {
        messages: true,
        id: true,
      }
    });

    return messages;
  } catch (e) {
    console.error(e);
  }
}

export const getHistory = async (userId: string) => { 
  try {
    const history = await prisma.history.findMany({
      where: {
        userId: userId,
      }, select: {
        id: true,
        title: true,
      }
    });

    return history
  } catch (e) {
    console.error(e);
  }
}