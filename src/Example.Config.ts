enum Scopes {
    identify = "identify",
    email = "email",
    connections = "connections",
    guilds = "guilds",
    guildsJoin = "guilds.join",
    gdmJoin = "gdm.join",
    rpc = "rpc",
    rpcNotificationsRead = "rpc.notifications.read",
    rpcVoiceRead = "rpc.voice.read",
    rpcVoiceWrite = "rpc.voice.write",
    rpcActivitiesWrite = "rpc.activities.write",
    bot = "bot",
    webhookIncoming = "webhook.incoming",
    messagesRead = "messages.read",
    applicationsBuildsUpload = "applications.builds.upload",
    applicationsBuildsRead = "applications.builds.read",
    applicationsCommands = "applications.commands",
    applicationsStoreUpdate = "applications.store.update",
    applicationsEntitlements = "applications.entitlements",
    activitiesRead = "activities.read",
    activitiesWrite = "activities.write",
    relationshipsRead = "relationships.read"
}

interface Config {
    proxy: string;
    scope: Scopes[];
    secret: string;
    id: string;
};

const config: Config = {
    proxy: "http://localhost:3001",
    scope: [Scopes.identify, Scopes.guilds],
    secret: "GYIVU#@%(V{)RPR",
    id: "1234567890"
};

export default config;