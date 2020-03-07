export const USER_FRAGMENT = `
    fragment UserParts on User {
        id 
        email
        following {
            username
        }
    }
`;
