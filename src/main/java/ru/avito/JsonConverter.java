package ru.avito;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import ru.avito.model.agent.Agent;

/**
 * Created by Dmitriy on 13.04.2017.
 */
public class JsonConverter {

    public static String buildJsonByField(Agent agent){
        ObjectNode node = new ObjectMapper().createObjectNode();
//        String jsonStructure = "{\"username\":%s, \"agentId\":%s}";
        node.put("username", agent.getUsername());
        node.put("notes", agent.getNotes());
        return node.toString();
    }

}
