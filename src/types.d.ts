interface ResponsePayload {
    ok: boolean;
    message: string;
    data: any;
}

interface User {
    email: string;
    createdAt: string;
    updatedAt: string;
    profile: Profile;
}

interface Profile {
    createdAt: string;
    updatedAt: string;
    firstname: string;
    lastname: string;
    username: string;
}
