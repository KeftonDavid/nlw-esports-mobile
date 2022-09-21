import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  const ip = '?'

  useEffect(() => {
    fetch(`http://${ip}:3333/games`)
    .then(res => res.json())
    .then(data => setGames(data))
  }, [])
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
        source={logoImg} 
        style={styles.logo}/>

        <Heading title='Encontre seu duo!' subtitle='Selecione o que deseja jogar...' ></Heading>
        <FlatList 
        data={games} 
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard data={item} onPress={() => handleOpenGame(item)}/>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
        ></FlatList>
      </SafeAreaView>
    </Background>
  );
}