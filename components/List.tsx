import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';

interface ListProps {
  data: any[];
  renderItem: any;
  isHorizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  customContentContainerStyle?: any;
  listEmptyComponent?: React.ReactElement;
}

interface EmptyListProps {
  text: string;
  customContainerStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
}

export const ListEmptyComponent = ({
  text,
  customContainerStyle,
  customTextStyle,
}: EmptyListProps) => {
  return (
    <View style={[styles.emptyListContainer, customContainerStyle]}>
      <Text style={[styles.emptyListText, customTextStyle]}>
        {text}
      </Text>
    </View>
  );
};

const List = ({
  data,
  renderItem,
  isHorizontal = true,
  showsHorizontalScrollIndicator = false,
  customContentContainerStyle,
  listEmptyComponent,
  ...props
}: ListProps) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={[
        styles.contentContainerStyle,
        customContentContainerStyle,
      ]}
      ListEmptyComponent={
        listEmptyComponent || (
          <ListEmptyComponent text={'No favorites yet add some first..'} />
        )
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 10,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
  emptyListText: {
    fontSize: 20,
    color: 'white',
  },
});

export default List;
