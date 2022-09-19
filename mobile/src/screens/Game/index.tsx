import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image ,Text,TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack(){
    navigation.goBack();
  }


  useEffect(() => {
    fetch(`http://192.168.0.6:3333/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300}/>
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo}/>
          <View style={styles.right}/>
        </View>
        
        <Image source={{uri:  game.bannerUrl}} style={styles.cover} resizeMode="cover"></Image>
        
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar"></Heading>
        <FlatList
        data={duos} 
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DuoCard onConnect={() => {}} data={item} key={item.id}/>
        )}
        horizontal
        style={[duos.length > 0 ? styles.containerList : styles.emptyListContent]}
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Ainda não há anúncios publicados para este jogo.
          </Text>
        )}
        />
      </SafeAreaView>
    </Background>
    
  );
}