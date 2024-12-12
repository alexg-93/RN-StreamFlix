import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovieBySearch,
  setSearchedValue,
  clearSearchResults,
} from '../redux/slices/searchSlice';
import { router } from 'expo-router';
import { debounce } from 'lodash';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const searchResults = useSelector(
    (state: RootState) => state.searchMovieReducer.searchResults
  );

  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);



  const dispatch = useDispatch<AppDispatch>();

  const handleOnChangeValue = (value: string) => {
    dispatch(setSearchedValue(value));
    setSearchValue(value);
  };

  // Debounced Dispatch
  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm !== '') {
      dispatch(fetchMovieBySearch(searchTerm));
    }
  }, 500);


  useEffect(() => {
    if (searchValue === '') {
      dispatch(clearSearchResults());
      return;
    }

    debouncedSearch(searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue]);

  

  return (
<SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            placeholder="Search Movie e.g Avengers"
            style={{
              ...styles.searchInput,
              borderColor: isFocused ? '#32A873' : '#121212',
            }}
            value={searchValue}
            onChangeText={handleOnChangeValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <View
            style={{...styles.searchContainer,display: !searchResults?.results ? 'none' : 'flex'}}
          >
            <FlatList
              contentContainerStyle={styles.flatListContent}
              style={styles.flatList}
              horizontal={false}
              data={searchResults?.results}
              renderItem={({ item: movie }) => (
                (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchValue(movie.title);
                      router.push({
                        pathname: '/movieDetails',
                        params: {
                          movieId: movie.id,
                        },
                      });
                    }}
                  >
                    <Text style={styles.movieTitle}>
                      {movie?.title}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    backgroundColor: 'white',
    width: width*0.8,
    minHeight: 100,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
  },
  flatListContent: {
    gap: 10,
  },
  flatList: {
    maxHeight: 400,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: width * 0.8,
    height: 45,
    alignSelf: 'center',
    fontSize: 16,
    paddingStart: 20,
    marginTop: 30,
    borderWidth: 2,
  }
});
