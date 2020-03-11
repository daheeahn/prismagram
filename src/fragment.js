// 재사용 하려면 fragment Parts~~~ 없이 그냥 이렇게 써주는 거!
export const USER_FRAGMENT = `
    id 
    avartar
    username
`;

export const COMMENT_FRAGMENT = `
    id 
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id 
    url
`;

// likes는 필요하면 넣기
// prisma에 있는게 아닌 isLiked likeCount 같은건 넣으면 안돼,
export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        user {
            ${USER_FRAGMENT}
        }
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        createdAt
        updatedAt
    }
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    from {
        ${USER_FRAGMENT}
    }
    to {
        ${USER_FRAGMENT}
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;
