import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../redux/slices/movieSlice';
import { router } from 'expo-router';

interface MoviesProps {
  title: string;
  moviesData: [];
  type?: 'popularMovies' | 'trendingMovies' | 'upcomingMovies' | string;
  displaySeeAll?: boolean;
  displayAmount?: number;
}

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    popularMovies,
    trendingMovies,
    upcomingMovies,
    isLoadingPopular,
    isLoadingTrending,
    isLoadingUpcoming,
  } = useSelector((state: any) => state.moviesReducer);

  useEffect(() => {
    dispatch(fetchPopularMovies({ page: 1 }));
    dispatch(fetchTrendingMovies());
    dispatch(fetchUpcomingMovies({ page: 1 }));
  }, []);

  const Movies = ({ title, moviesData , type , displaySeeAll  = true , displayAmount = 20 }: MoviesProps) => (
    <View style={styles.moviesContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {displaySeeAll && <TouchableOpacity onPress={() => {
          router.push({
            pathname: '/movieList',
            params: {
              movieType: type,
              title: title
            },
          });
        }}>
          <Text style={styles.seeAllText}>{'See All'}</Text>
        </TouchableOpacity>}
      </View>

      <ScrollView
        style={{}}
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
      >
        {moviesData?.slice(0, displayAmount).map((movie: any) => (
          <TouchableOpacity
            key={movie.id}
            style={{ marginRight: 10 }}
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
                uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
              }}
              style={{ width: 120, height: 180, borderRadius: 15 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
      {isLoadingTrending ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Movies title="Trending movies" moviesData={trendingMovies.movies} type='trendingMovies' displaySeeAll={false} />
        )}
        {isLoadingPopular ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Movies title="Popular movies" moviesData={popularMovies.movies} type='popularMovies' displayAmount={10} />
        )}
        {isLoadingUpcoming ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Movies title="Upcoming movies" moviesData={upcomingMovies.movies} type='upcomingMovies' displayAmount={10} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: '#F3F3F3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  moviesContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    flex: 0.88,
    flexDirection: 'column',
    gap: 10,
  },
  seeAllText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 600,
  },
});
