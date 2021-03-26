import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

class ContactListItem extends PureComponent {

    render() {
        const props = this.props;

        return (
            <TouchableOpacity style={styles.item} onPress={props.onPress}>
                <Text style={styles.text}>{props.name}</Text>
            </TouchableOpacity>
        )
    }
}

export default ContactListItem;

