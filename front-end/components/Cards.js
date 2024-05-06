export const Cards = ({images, selectedTopic, setSelectedTopic}) => (
  <View className="w-full h-[34%] bg-white">
    <FlatList
      data={images}
      renderItem={({ item, index }) => (
        <TouchableOpacity
              onPress={() => {
                console.log("touch card");
              }}
              className="p-2 w-1/3"
            >
              <Image
                source={{ uri: item }}
                className="h-[110] w-full rounded-3xl"
                resizeMode="cover"
              />
            </TouchableOpacity>
      )}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      // keyExtractor={(_, index) => index.toString()}
    />
  </View>
)