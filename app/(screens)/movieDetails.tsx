import React, { useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AppDispatch ,RootState} from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovieCreditsById,
  fetchMovieDetailsById,
} from '../redux/slices/movieDetailsSlice';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import DescriptionBox from '@/components/DescriptionBox';
import List from '@/components/List';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addFavoriteMovie, removeFavoriteMovie } from '../redux/slices/favoriteMovieSlice';


interface CastMember {
    name: string;
    profile_path: string;
  }
  
  interface CrewMember {
    name: string;
    profile_path: string;
  }
  
  interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
  }
  
  interface MovieDetails {
    original_title: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    genres: { name: string }[];
    vote_average: number;
    overview: string;
    credits: Credits;
  }

const MovieDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { movieId } = useLocalSearchParams();

  const movieDetails = useSelector( (state: RootState) => state.movieDetailsReducer.movieDetails as MovieDetails);
  const isFavorite = useSelector((state: RootState) => state.favoriteMovieReducer.favorites.find((movie) => movie.id.toString() === movieId.toString()));

  const cast = movieDetails?.credits?.cast;
  const crew = movieDetails?.credits?.crew;

  useEffect(() => {
    dispatch(fetchMovieDetailsById(movieId.toString())).then(() => {
      dispatch(fetchMovieCreditsById(movieId.toString()));
    });
  }, [movieId]);

  useEffect(() => {
    navigation.setOptions({
      title: movieDetails?.original_title,
    });
  }, [navigation, movieDetails]);

  const handleAddFavoriteMovie = () =>{
     dispatch(addFavoriteMovie(movieDetails));
  }

  const handleRemoveFaviteMovie = () => {
    dispatch(removeFavoriteMovie({id: movieId}));
  }


  return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10,paddingVertical:20}} style={{backgroundColor: '#121212'}}>
           <View style={{width:30,height:30,alignSelf:'flex-end',alignItems:'center',justifyContent:'center',end:10}}>
           <TouchableOpacity onPress={isFavorite ? handleRemoveFaviteMovie : handleAddFavoriteMovie}>
              <AntDesign name="heart" size={24} color={isFavorite ? 'red' : 'white'} />
            </TouchableOpacity>
           </View>
          <View style={styles.backdropImgContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`,
              }}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
           
          </View>

          <View style={styles.movieSpecs}>
            <Badge text={movieDetails?.release_date} display={true} />
            <Badge text={movieDetails?.runtime + ' Min'} display={true} />
            <Badge
              text={movieDetails?.genres?.[0]?.name || 'Unknown Genre'}
              display={true}
            />
            <Badge text={movieDetails?.vote_average} display={true} />
          </View>

          <DescriptionBox description={movieDetails?.overview}/>

         

          <View style={{ marginTop: 20 }}>
            <View>
              <Text
                style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
              >
                {'Cast'}
              </Text>
            </View>
            <List
              data={cast}
              renderItem={({ item } : {item: CastMember}) => (
                <Card title={item.name} image_path={item.profile_path} />
              )}
              isHorizontal={true}
              showsHorizontalScrollIndicator={false}
            />

          </View>

          <View style={{ marginTop: 20 }}>
            <View>
              <Text
                style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
              >
                {'Crew'}
              </Text>
            </View>
            <List 
              data={crew}
              renderItem={({ item } : {item: CrewMember}) => (
                <Card title={item.name} image_path={item.profile_path} />
              )}
              isHorizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backdropImgContainer: {
    width: '97%',
    height: 250,
    alignSelf: 'center',
    flex: 0.4,
    marginTop:30
  },
  movieSpecs: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flex: 0.05,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default MovieDetails;
