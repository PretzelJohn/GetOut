import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import createStyles from './ListEmpty.style';
import Text from "../text-wrapper/TextWrapper";

interface ListEmptyProps {
    message: string;
}

const ListEmpty: React.FC<ListEmptyProps> = (props) => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Text color={colors.text}>{props.message}</Text>
        </View>
    );
};

export default ListEmpty;