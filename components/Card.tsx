import {
  Image,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';

interface CardProps {
  title: string;
  image_path: string;
  customURI?: string;
  customCardContainerStyle?: StyleProp<ViewStyle>;
  customTextLabelStyle?: StyleProp<TextStyle>;
  customImgStyle?: StyleProp<ImageStyle>;
  customImageContainerStyle?: StyleProp<ViewStyle>;
  customTitleContainerStyle?: StyleProp<ViewStyle>;
  customContentContainerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const Card = ({
  title,
  image_path,
  customURI,
  customCardContainerStyle,
  customTextLabelStyle,
  customImgStyle,
  customImageContainerStyle ,
  customTitleContainerStyle ,
  customContentContainerStyle,
  disabled = false,
  onPress = () => {},
  children,
  ...props
}: CardProps) => {
  return (
      <TouchableOpacity
        style={[styles.cardContainerStyle, customCardContainerStyle]}
        disabled={disabled}
        onPress={onPress}
        {...props}
      >
        {customURI || image_path && (
            <View style={[styles.imageContainerStyle,customImageContainerStyle]}>
              <Image
                source={{
                  uri:
                    customURI ||
                    `https://image.tmdb.org/t/p/original/${image_path}`,
                }}
                style={[styles.imgStyle, customImgStyle]}
              />
            </View>
          )}
        <View style={[styles.contentContainerStyle , customContentContainerStyle]}>
          <View style={customTitleContainerStyle}>
            <Text style={[styles.cardTextLabelStyle, customTextLabelStyle]}>
              {title}
            </Text>
          </View>
          {children}
        </View>


      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: '#352F44',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    borderRadius: 10,
    height: 150,
    width: 150,
  },
  cardTextLabelStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainerStyle:{
    marginTop:5,
  },
  imgStyle: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  contentContainerStyle: {
    flex:1,
    flexDirection:'column',
    height:'100%',
  },
});

export default Card;
