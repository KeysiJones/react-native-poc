import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TabOneScreen() {
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() => {
    const fetchData = async  () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      const pokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
            const pokemonCompleteData = await axios.get(pokemon.url)
            return pokemonCompleteData.data
        })
      )
      setPokemonData(pokemons)
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContainer}>
      {pokemonData.map((pokemon) => {
        return (
          <View key={pokemon.name} style={styles.pokemonContainer}>
            <Image
              style={styles.image}
              source={{ uri: pokemon?.sprites?.other['official-artwork']?.front_default }} // URI of your image
              />
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
          </View>
        )
      })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonName: {
    fontSize: 18,
    textTransform: 'capitalize'
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 30,
  },
  image: {
    width: '100%', // Width of the image
    height: '100%', // Height of the image
  },
  pokemonContainer: {
    backgroundColor: 'lightgrey',
    width: 250,
    height: 250,
    padding: 30,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
