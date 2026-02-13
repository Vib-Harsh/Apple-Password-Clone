import { User } from '../models/user.model';

// Mock Data
let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const userService = {
  createUser: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  },

  getUser: async (id: string): Promise<User | undefined> => {
    return users.find((user) => user.id === id);
  },

  getAllUsers: async (): Promise<User[]> => {
    return users;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User | undefined> => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    users[index] = { ...users[index], ...data, updatedAt: new Date() };
    return users[index];
  },

  deleteUser: async (id: string): Promise<boolean> => {
    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);
    return users.length !== initialLength;
  },
};
