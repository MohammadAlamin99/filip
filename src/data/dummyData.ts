export interface User {
  name: string;
  avatar: any;
  greeting: string;
}

export const userData: User = {
  name: 'Alex',
  avatar: require('../../assets/images/image1.png'),
  greeting: 'Good Morning',
};