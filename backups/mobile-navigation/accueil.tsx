
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  MapPin,
  MessageSquare,
  Scale,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import { router } from 'expo-router';

const COLORS = {
  navy: '#0A2545',
  deep: '#0E3041',
  gold: '#C3A16A',
  background: '#F5F7FA',
  white: '#FFFFFF',
  text: '#172A40',
  muted: '#69798B',
  border: '#E3E9EF',
};

type Section = {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

const sections: Section[] = [
  {
    id: 'comite',
    title: 'Le Comité',
    description: 'Mission et organisation',
    detail:
      'Découvrez la mission du CCPD, son organisation et son action dans les huit provinces du Bloc Est.',
    icon: Building2,
  },
  {
    id: 'politique',
    title: 'Politique',
    description: 'Dialogue et gouvernance',
    detail:
      'Consultez les orientations, réflexions et travaux consacrés aux questions politiques.',
    icon: Landmark,
  },
  {
    id: 'economie',
    title: 'Économie',
    description: 'Développement économique',
    detail:
      'Retrouvez les initiatives et les travaux relatifs à l’économie et au développement.',
    icon: Scale,
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Bibliothèque officielle',
    detail:
      'Consultez les documents de référence, présentations et publications du CCPD.',
    icon: FileText,
  },
  {
    id: 'doctrines',
    title: 'Doctrines',
    description: 'Orientations et références',
    detail:
      'Parcourez les doctrines publiées par le CCPD et leurs contenus détaillés.',
    icon: BookOpen,
  },
  {
    id: 'avis',
    title: 'Donner mon avis',
    description: 'Consultation et contributions',
    detail:
      'Exprimez votre opinion, y compris anonymement, dans un espace soumis à modération.',
    icon: MessageSquare,
  },
  {
    id: 'participer',
    title: 'Participer',
    description: 'Rejoindre les initiatives',
    detail:
      'Présentez une demande de participation et suivez son traitement après validation.',
    icon: Handshake,
  },
];

const provinces = [
  'Bas-Uele',
  'Haut-Uele',
  'Ituri',
  'Maniema',
  'Nord-Kivu',
  'Sud-Kivu',
  'Tanganyika',
  'Tshopo',
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;



  return (
    <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={[
          styles.page,
          { paddingHorizontal: isTablet ? 36 : 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.topLabel}>
            <Globe2 size={13} color={COLORS.muted} />
            <Text style={styles.topLabelText}>
              RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
            </Text>
          </View>

          <View style={styles.header}>
            <View style={styles.brandSymbol}>
              <Text style={styles.brandInitials}>CCPD</Text>
            </View>

            <View style={styles.brandText}>
              <Text style={styles.brandName}>
                CCPD BLOC EST
              </Text>
              <Text style={styles.brandSubtitle}>
                Paix, dialogue et développement
              </Text>
            </View>

            <View style={styles.headerIndicator}>
              <View style={styles.indicatorDot} />
              <Text style={styles.indicatorText}>
                MOBILE
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.hero,
              isTablet && styles.heroTablet,
            ]}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroEyebrow}>
                <View style={styles.goldLine} />
                <Text style={styles.heroEyebrowText}>
                  CCPD · BLOC EST RDC
                </Text>
              </View>

              <Text
                style={[
                  styles.heroTitle,
                  isTablet && styles.heroTitleTablet,
                ]}
              >
                Huit provinces.{'\n'}
                Une ambition commune.
              </Text>

              <Text style={styles.heroDescription}>
                Un espace numérique dédié à la
                consultation, au dialogue et au
                développement du Bloc Est de la RDC.
              </Text>

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/rubrique/[slug]',
                    params: { slug: 'comite' },
                  })
                }
                style={styles.heroAction}
              >
                <Text style={styles.heroActionText}>
                  Découvrir le Comité
                </Text>
                <ArrowUpRight size={18} color={COLORS.navy} />
              </Pressable>
            </View>

            {isTablet && (
              <View style={styles.heroNumberPanel}>
                <Text style={styles.heroNumber}>08</Text>
                <View style={styles.heroNumberDivider} />
                <Text style={styles.heroNumberCaption}>
                  PROVINCES
                </Text>
                <Text style={styles.heroNumberSub}>
                  BLOC EST · RDC
                </Text>
              </View>
            )}
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.overline}>
                NOTRE PLATEFORME
              </Text>
              <Text style={styles.heading}>
                Explorer le CCPD
              </Text>
              <Text style={styles.headingDescription}>
                Retrouvez les différentes composantes
                de notre plateforme institutionnelle.
              </Text>
            </View>
          </View>

          <View style={styles.grid}>
            {sections.map((section) => {
              const Icon = section.icon;
              

              return (
                <Pressable
                  key={section.id}
                  onPress={() =>
                    router.push({
                      pathname: '/rubrique/[slug]',
                      params: { slug: section.id },
                    })
                  }
                  accessibilityRole="button"
                  accessibilityLabel={section.title}
                  style={[
                    styles.sectionCard,
                    {
                      width: isTablet ? '48.7%' : '100%',
                    },
                    
                  ]}
                >
                  <View style={styles.cardTop}>
                    <View style={styles.iconBox}>
                      <Icon
                        size={23}
                        color={COLORS.navy}
                        strokeWidth={1.7}
                      />
                    </View>
                    <ArrowUpRight
                      size={19}
                      color={COLORS.muted}
                      strokeWidth={1.7}
                    />
                  </View>

                  <Text style={styles.cardTitle}>
                    {section.title}
                  </Text>
                  <Text style={styles.cardDescription}>
                    {section.description}
                  </Text>

                  <View style={styles.cardBottom}>
                    <Text style={styles.cardAction}>
                      Explorer
                    </Text>
                    <ArrowRight
                      size={15}
                      color={COLORS.navy}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>

          

          <View style={styles.provincesPanel}>
            <View style={styles.provincesHeading}>
              <MapPin
                size={21}
                color={COLORS.gold}
                strokeWidth={1.8}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.provincesTitle}>
                  Les huit provinces
                </Text>
                <Text style={styles.provincesSubtitle}>
                  Couverture territoriale du Bloc Est
                </Text>
              </View>
            </View>

            <View style={styles.provinceGrid}>
              {provinces.map((province, index) => (
                <View
                  key={province}
                  style={[
                    styles.provinceItem,
                    {
                      width: isTablet ? '23%' : '47%',
                    },
                  ]}
                >
                  <Text style={styles.provinceNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                  <Text style={styles.provinceName}>
                    {province}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerBrand}>
              CCPD BLOC EST RDC
            </Text>
            <Text style={styles.footerText}>
              Paix · Dialogue · Développement
            </Text>
            <Text style={styles.footerVersion}>
              Application mobile — développement
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  page: {
    paddingTop: 16,
    paddingBottom: 45,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 1100,
  },
  topLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 19,
  },
  topLabelText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandSymbol: {
    width: 52,
    height: 52,
    backgroundColor: COLORS.navy,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandInitials: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  brandText: {
    flex: 1,
    paddingLeft: 12,
  },
  brandName: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  brandSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  headerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 20,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  indicatorText: {
    fontSize: 9,
    color: COLORS.navy,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 18,
    padding: 27,
    marginBottom: 38,
  },
  heroTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 42,
    minHeight: 310,
  },
  heroContent: {
    flex: 1,
  },
  heroEyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  goldLine: {
    height: 2,
    width: 25,
    backgroundColor: COLORS.gold,
  },
  heroEyebrowText: {
    color: '#D6C09D',
    fontSize: 10,
    letterSpacing: 1.7,
    fontWeight: '700',
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 39,
    fontWeight: '800',
    marginBottom: 16,
  },
  heroTitleTablet: {
    fontSize: 42,
    lineHeight: 52,
  },
  heroDescription: {
    color: '#CED8E4',
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 470,
    marginBottom: 26,
  },
  heroAction: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 12,
    minHeight: 48,
  },
  heroActionText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '800',
  },
  heroNumberPanel: {
    width: 220,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#36516B',
    marginLeft: 30,
    paddingLeft: 30,
  },
  heroNumber: {
    color: COLORS.white,
    fontSize: 90,
    fontWeight: '300',
    lineHeight: 110,
  },
  heroNumberDivider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.gold,
    marginVertical: 9,
  },
  heroNumberCaption: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  heroNumberSub: {
    color: '#ACC0D2',
    fontSize: 10,
    marginTop: 8,
    letterSpacing: 1,
  },
  sectionHeading: {
    marginBottom: 22,
  },
  overline: {
    color: '#9A7C4F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: 8,
  },
  heading: {
    color: COLORS.navy,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 7,
  },
  headingDescription: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 21,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    minHeight: 190,
    marginBottom: 15,
  },
  sectionCardActive: {
    borderColor: COLORS.gold,
    borderWidth: 1.5,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 9,
    backgroundColor: '#EFF3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardDescription: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  cardBottom: {
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardAction: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  detailPanel: {
    backgroundColor: '#EBF0F5',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
    borderRadius: 10,
    padding: 24,
    marginTop: 10,
    marginBottom: 35,
  },
  detailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailTitle: {
    color: COLORS.navy,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 11,
  },
  detailText: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 23,
  },
  detailNote: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 16,
  },
  provincesPanel: {
    marginTop: 20,
    padding: 24,
    borderRadius: 14,
    backgroundColor: COLORS.deep,
  },
  provincesHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  provincesTitle: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 21,
  },
  provincesSubtitle: {
    color: '#B8CBD4',
    fontSize: 12,
    marginTop: 5,
  },
  provinceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  provinceItem: {
    borderTopWidth: 1,
    borderTopColor: '#44606E',
    paddingVertical: 14,
    marginBottom: 6,
  },
  provinceNumber: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
  },
  provinceName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 36,
  },
  footerBrand: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 7,
  },
  footerVersion: {
    color: '#9CA8B6',
    fontSize: 10,
    marginTop: 12,
  },
});
