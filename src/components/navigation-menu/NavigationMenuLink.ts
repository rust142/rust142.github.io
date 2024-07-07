export interface NavlinkMenuLink {
  name: string;
  url: string;
}

export function navMenuLinks(): NavlinkMenuLink[] {
  return [
    {
      name: 'About',
      url: '/about'
    },
    {
      name: 'Projects',
      url: '/projects'
    },
    {
      name: 'Uses',
      url: '/uses'
    },
    {
      name: 'Photography',
      url: '/photography'
    },
  ]
}
