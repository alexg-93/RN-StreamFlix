import React, { useEffect } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  Movie,
  Movies,
  setCurrentPage,
} from '../redux/slices/movieSlice';


const MovieListScreen = () => {
  
  const navigation = useNavigation();
  const { movieType ,title } = useLocalSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState): any =>state.moviesReducer[movieType as keyof Movies]).movies;
  const page = useSelector((state: RootState) : any => state.moviesReducer[movieType as keyof Movies]).page;



  useEffect(()=>{
    navigation.setOptions({
      title: title
    })
  } ,[title,navigation])

  const handleLoadMoreMovies =  async () =>{
    switch (movieType) {
        case 'popularMovies':
        dispatch(setCurrentPage({
                page: page + 1,
                movieType: movieType
        }));
        dispatch(fetchPopularMovies({ page: page + 1  }));
        return;
        case 'upcomingMovies':
          dispatch(setCurrentPage({
                page: page + 1,
                movieType: movieType
              }));
          dispatch(fetchUpcomingMovies({ page: page + 1 }));
          return;
      }
  }

  return (
    
 <View style={styles.container}>
    {movies && movies.length  > 0 && (
         <FlatList style={{marginTop:20}} data={movies} renderItem={({ item: movie }: { item: Movie }) => (
            <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => {
              router.push({
                pathname: '/movieDetails',
                params: {
                  movieId: movie.id,
                },
              });
            }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
              }}
              style={{ width: 120, height: 180, borderRadius: 15 }}
            />
          </TouchableOpacity>)}
          numColumns={3}
          horizontal={false}
          onEndReached={handleLoadMoreMovies}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
        />
    )}
 </View>
    
  )

};


const styles = StyleSheet.create({
    container : {
       flex: 1,
       backgroundColor: '#121212',
       alignItems:'center'
    }
 });

export default MovieListScreen;
