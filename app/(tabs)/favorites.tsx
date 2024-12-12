import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import List from '@/components/List';
import Card from '@/components/Card';

const FavoritesScreen = () => {


  const favorites = useSelector((state: RootState) => state.favoriteMovieReducer.favorites);

  const Children = ({ text }: { text: string }) => {
    return (
      <View style={{ width: '95%'}}>
        <Text numberOfLines={6} style={{ color: 'white', fontSize: 12 }}>
          {text}
        </Text>
      </View>
    );
  };


  const handleOnPress = (movieId:number) =>{
    router.push({
        pathname: '/movieDetails',
        params: {
          movieId: movieId,
        },
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <List
        data={favorites}
        renderItem={({ item }: any) => (
          <Card
            title={item.title}
            image_path={item.poster_path}
            customCardContainerStyle={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'flex-start',
              gap: 20,
              alignItems: 'flex-start',
              alignSelf: 'center',
              marginTop: 10,
            }}
            customImageContainerStyle={{
              start: 10,
              alignSelf: 'center'
            }}
            customImgStyle={{
              height: '90%'
            }}
            customTextLabelStyle={{
              fontSize: 16
            }}
            customTitleContainerStyle={{
              marginTop: 10
            }}
            customContentContainerStyle={{
              gap: 10
            }}
            children={<Children text={item.overview} />}
            onPress={()=>handleOnPress(item.id)}
          />
        )}
        isHorizontal={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default FavoritesScreen;
