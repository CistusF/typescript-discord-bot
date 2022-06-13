export type i18n = {
    Event: {
        MessageCreate: {
            commandError: string;
        };
        Ready: {
            ready: string;
        };
    };
    Command: {
        [key: string]: Command;
        ping: {
            description: string;
            synonym: string[];
            contents: string[];
        };
        setLang: {
            description: string;
            synonym: string[];
            contents?: string[];
        }
    };
    Error: string;
};
export type Command = {
    description: string;
    synonym: string[];
    contents?: string[];
}