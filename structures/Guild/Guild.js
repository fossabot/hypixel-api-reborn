const GuildMember = require('./GuildMember');
const GuildRank = require('./GuildRank');
const Color = require('../../utils/Color')
const Games = require('../../utils/MiniGames')
const getGuildLevel = require('../../utils/getGuildLevel')

class Guild {
    constructor(data) {
        this.id = data['_id'];
        this.name = data['name'];
        this.description = data['description'] ? data['description'] : null;

        this.coins = data['coinsEver'];
        this.experience = data['exp'] || 0;
        this.level = getGuildLevel(this.experience)

        this.createdAt = data['created'];
        this.joinable = data['joinable'] ? data['joinable'] : false;
        this.publiclyListed = data['publiclyListed'];

        this.members = data['members'] ? data['members'].map(m => new GuildMember(m)) : null;
        this.ranks = data['ranks'] ? data['ranks'].map(r => new GuildRank(r)) : null;

        this.tag = {
            string: data['tag'] ? data['tag'] : null,
            color: data['tagColor'] ? Color.ColorString[data['tagColor']] : null,
            hexColor: data['tagColor'] ? Color.ColorHex[data['tagColor']] : null
        }

        this.legacyRank = parseInt(data.legacyRanking)+1;
        this.achievements = {
            winners: data['achievements'] !== undefined ? data['achievements'].WINNERS : 0,
            experienceKings: data['achievements'] !== undefined ? data['achievements'].EXPERIENCE_KINGS : 0,
            onlinePlayers: data['achievements'] !== undefined ? data['achievements'].ONLINE_PLAYERS : 0
        }
        this.preferredGames = data.preferredGames ? data.preferredGames.map(g => Games[g]) : null;


    }
}
module.exports = Guild;