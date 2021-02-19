
import React from "react";

import { Text } from 'react-native';

const Contact = ({ contactDetails }) => {

    //contactDetails = ...
    // à peu près comme ça :
    contact = {
        firstname: 'Jules',
        lastname: 'Doumeche',
        prop: {
            email: 'jules@gmail.com',
            phone: '+33 7 77 77 77',
        }
    }

    return (
        <Text >{contact.firstname} {contact.lastname}</Text>
    );
};

export default Contact;  