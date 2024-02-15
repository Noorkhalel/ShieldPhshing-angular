import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'homeboard',
        icon: 'fal fa-home',
        label: 'Home'
    }, 
    {
        routeLink: 'multidimensional',
        icon: 'fa fa-bezier-curve',
        label: 'Body Check',
    },
    {
        routeLink: 'URLlevel',
        icon: 'fa fa-link',
        label: 'URL level Check',
    },
    {
        routeLink: 'apis',
        icon: 'fal fa-flask',
        label: 'APIs',
    },
    {
        routeLink: 'abutus',
        icon: 'fal fa-user-astronaut',
        label: 'Abut Us',

    },
    {
        routeLink: 'Settings',
        icon: 'fal  fa-cog',
        label: 'Settings',
        items: [
            {
                routeLink: 'settings/settings',
                label: 'Profile'

            },

        ]
    },
    
];