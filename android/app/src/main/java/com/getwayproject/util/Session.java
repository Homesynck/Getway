package com.getwayproject.util;

public class Session {

    private static Session session;
    private static boolean create = false;

    private User user;


    private Session(){
        user = new User();
    }

    /**
     * Permet de créer une session initialisée
     * @return false si la session est déja créée
     */
    public static boolean create(){
        if (!create){
            session = new Session();
            return true;
        }
        return false;
    }

    /**
     * Permet d'obtenir la session
     * @return la session
     */
    public static Session getSession() {
        return session;
    }
}
