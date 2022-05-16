import tw from 'twrnc'
import {ListItem} from "@rneui/themed";


const CustomListItem = ({id, isVisible}) => {
    return(
        <ListItem key={id} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{id}</ListItem.Title>
                <ListItem.Subtitle>{isVisible}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem;