import * as Manifesto from './00_manifesto.js';
import * as Core from './10_core_mechanics.js';
import * as Economy from './11_economy.js';
import * as CharGen from './20_chargen.js';
import * as Attributes from './30_attributes.js';
import * as Cyberware from './40_cyberware.js';
import * as Netrunning from './50_netrunning.js';
import * as Skills from './60_skills.js';
import * as Gear from './70_gear.js';
import * as World from './80_world_lore.js';
import * as AISociety from './81_ai_society.js';
import * as Surveillance from './83_surveillance.js';
import * as Demographics from './84_demographics.js';
import * as USAWiki from './86_usa_wiki.js';
import * as Corporations from './87_corporations.js';
export const DATABASE_REGISTRY = {
    // ... (Keep existing Home and Rules sections) ...
    "root_home": {
        id: "root_home",
        parentId: null,
        title: "BURN CARD",
        icon: "Terminal",
        content: Manifesto.content
    },
    
    // ... Rules ...
    
    "root_rules": { id: "root_rules", parentId: null, title: "CORE RULES", icon: "BookOpen" },
    "core_mech": { id: "core_mech", parentId: "root_rules", title: Core.title, icon: Core.icon, content: Core.content },
    "economy": { id: "economy", parentId: "root_rules", title: Economy.title, icon: Economy.icon, content: Economy.content },
    
    // ... Character ...
    "root_char": { id: "root_char", parentId: null, title: "AGENT RECORD", icon: "User" },
    "chargen": { id: "chargen", parentId: "root_char", title: CharGen.title, icon: CharGen.icon, content: CharGen.content },
    "attributes": { id: "attributes", parentId: "root_char", title: Attributes.title, icon: Attributes.icon, content: Attributes.content },
    "skills": { id: "skills", parentId: "root_char", title: Skills.title, icon: Skills.icon, content: Skills.content },
    
    // ... Hardware ...
    "root_gear": { id: "root_gear", parentId: null, title: "HARDWARE", icon: "Package" },
    "cyberware": { id: "cyberware", parentId: "root_gear", title: Cyberware.title, icon: Cyberware.icon, content: Cyberware.content, image: Cyberware.image },
    "netrunning": { id: "netrunning", parentId: "root_gear", title: Netrunning.title, icon: Netrunning.icon, content: Netrunning.content },
    "gear": { id: "gear", parentId: "root_gear", title: Gear.title, icon: Gear.icon, content: Gear.content },
    
    // --- NEW SECTION: WORLD ---
    "root_world": { id: "root_world", parentId: null, title: "WORLD INTEL", icon: "Wifi" },
    
         "world_lore": {
                id: "world_lore",
                parentId: "root_world",
                title: World.title,
                icon: World.icon,
                content: World.content
           },
            "ai_society": {
                id: "ai_society",
                parentId: "root_world",
                title: AISociety.title,
                icon: AISociety.icon,
                content: AISociety.content
            },
            "surveillance": { 
                id: "surveillance", 
                parentId: "root_world", 
                title: Surveillance.title, 
                icon: Surveillance.icon, 
                content: Surveillance.content 
            },
            "demographics": { 
                id: "demographics", 
                parentId: "root_world", 
                title: Demographics.title, 
                icon: Demographics.icon, 
                content: Demographics.content 
            },
            "usa_wiki": { 
                id: "usa_wiki", 
                parentId: "root_world", 
                title: USAWiki.title, 
                icon: USAWiki.icon, 
                content: USAWiki.content,
                infobox: USAWiki.infobox 
            },
            "corporations": { 
                id: "corporations", 
                parentId: "root_world", 
                title: Corporations.title, 
                icon: Corporations.icon, 
                content: Corporations.content,
                infobox: Corporations.infobox 
            }
};