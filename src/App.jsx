import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HowItWorks from "./HowItWorks";
import AboutTheTool from "./AboutTheTool";
import Footer from "./Footer";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Fuse from "fuse.js";

const TizardinAiPostalCodeFinder = () => {
  const locations = [
    { city: "ALBION", locality: "Splendid View", postalCode: "91008" },
    { city: "ALBION", locality: "Splendid Village", postalCode: "91009" },
    { city: "ALBION", locality: "Albion", postalCode: "91001" },
    { city: "ALBION", locality: "Camp Creoles", postalCode: "91002" },
    { city: "ALBION", locality: "La Croisette", postalCode: "91003" },
    { city: "ALBION", locality: "Morc Beerjeeraz", postalCode: "91004" },
    { city: "ALBION", locality: "Morc de Chazal", postalCode: "91005" },
    { city: "ALBION", locality: "Morc Raffray", postalCode: "91006" },
    { city: "ALBION", locality: "Morc Terre Albion", postalCode: "91007" },
    { city: "AMITIE GOKHOOLA", locality: "Amitie", postalCode: "31501" },
    { city: "AMITIE GOKHOOLA", locality: "Cite EDC", postalCode: "31502" },
    { city: "AMITIE GOKHOOLA", locality: "Gokhoola", postalCode: "31503" },
    { city: "AMITIE GOKHOOLA", locality: "Morc VRS", postalCode: "31504" },
    { city: "ARSENAL", locality: "Petit Gamin", postalCode: "20109" },
    { city: "ARSENAL", locality: "Riviere Citron", postalCode: "20110" },
    { city: "ARSENAL", locality: "St Joseph", postalCode: "20111" },
    { city: "ARSENAL", locality: "Morc Baie aux Tortues", postalCode: "21307" },
    { city: "ARSENAL", locality: "Morc Le Vieux Banian", postalCode: "21308" },
    { city: "ARSENAL", locality: "Arsenal", postalCode: "20101" },
    { city: "ARSENAL", locality: "Domaine Les Cascades", postalCode: "20102" },
    { city: "Bois Cheri", locality: "Rte Bois Cheri", postalCode: "81419" },
    { city: "Bois Cheri", locality: "Bois Cheri", postalCode: "80804" },
    { city: "Bois Cheri", locality: "Ahchin", postalCode: "60201" },
    { city: "Bois Cheri", locality: "Akla Road", postalCode: "60202" },
    { city: "Bois Cheri", locality: "Bois Cheri", postalCode: "60203" },
    { city: "Bois Cheri", locality: "Building", postalCode: "60204" },
    { city: "Bois Cheri", locality: "Cader Road", postalCode: "60205" },
    {
      city: "Bois Cheri",
      locality: "Cite EDC Bois Cheri",
      postalCode: "60206",
    },
    { city: "Bois Cheri", locality: "Cooperative", postalCode: "60207" },
    { city: "Bois Cheri", locality: "Heerallal Rd", postalCode: "60208" },
    { city: "Bois Cheri", locality: "Mambahal", postalCode: "60209" },
    { city: "Bois Cheri", locality: "Morc VRS", postalCode: "60210" },
    { city: "Bois Cheri", locality: "Porida", postalCode: "60211" },
    {
      city: "Bois Cheri",
      locality: "Residence Bois Cheri",
      postalCode: "60212",
    },
    { city: "Bois Cheri", locality: "Seeruttun Rd", postalCode: "60213" },
    { city: "Bois Cheri", locality: "Tivoli", postalCode: "60214" },
    {
      city: "Bois des Amourettes",
      locality: "Rte Bois Cheri",
      postalCode: "81419",
    },
    {
      city: "Bois des Amourettes",
      locality: "Bois Cheri",
      postalCode: "80804",
    },
    { city: "Bois des Amourettes", locality: "Ahchin", postalCode: "60201" },
    { city: "Bois des Amourettes", locality: "Akla Road", postalCode: "60202" },
    {
      city: "Bois des Amourettes",
      locality: "Bois Cheri",
      postalCode: "60203",
    },
    { city: "Bois des Amourettes", locality: "Building", postalCode: "60204" },
    {
      city: "Bois des Amourettes",
      locality: "Cader Road",
      postalCode: "60205",
    },
    {
      city: "Bois des Amourettes",
      locality: "Cite EDC Bois Cheri",
      postalCode: "60206",
    },
    {
      city: "Bois des Amourettes",
      locality: "Cooperative",
      postalCode: "60207",
    },
    {
      city: "Bois des Amourettes",
      locality: "Heerallal Rd",
      postalCode: "60208",
    },
    { city: "Bois des Amourettes", locality: "Mambahal", postalCode: "60209" },
    { city: "Bois des Amourettes", locality: "Morc VRS", postalCode: "60210" },
    { city: "Bois des Amourettes", locality: "Porida", postalCode: "60211" },
    {
      city: "Bois des Amourettes",
      locality: "Residence Bois Cheri",
      postalCode: "60212",
    },
    {
      city: "Bois des Amourettes",
      locality: "Seeruttun Rd",
      postalCode: "60213",
    },
    { city: "Bois des Amourettes", locality: "Tivoli", postalCode: "60214" },
    {
      city: "Bambous Virieux",
      locality: "Bambous Virieux",
      postalCode: "50101",
    },
    { city: "Bambous Virieux", locality: "Debarcadere", postalCode: "50102" },
    { city: "Bambous Virieux", locality: "Les Mares", postalCode: "50103" },
    {
      city: "Bambous Virieux",
      locality: "Pointe Bambous",
      postalCode: "50104",
    },
    { city: "Benares", locality: "Plaine Verte 4", postalCode: "11612" },
    { city: "Benares", locality: "Plaine Verte 3", postalCode: "11611" },
    { city: "Benares", locality: "Plaine Verte 2", postalCode: "11503" },
    { city: "Benares", locality: "BENARES", postalCode: "61103" },
    { city: "Benares", locality: "BATIMARAIS", postalCode: "61101" },
    { city: "Benares", locality: "COLMAR", postalCode: "61102" },
    { city: "Britannia", locality: "Morc VRS R.DRAGON", postalCode: "61205" },
    { city: "Britannia", locality: "Camp Berthaud", postalCode: "61206" },
    { city: "Britannia", locality: "Britannia", postalCode: "61201" },
    { city: "Britannia", locality: "Cite Rampur", postalCode: "61202" },
    {
      city: "Britannia",
      locality: "VRS Britannia (land only)",
      postalCode: "61203",
    },
    {
      city: "Britannia",
      locality: "Riviere Dragon Baie Du Cap",
      postalCode: "61204",
    },
    { city: "Baie Du Cap", locality: "Baie Du Cap", postalCode: "60101" },
    { city: "Baie Du Cap", locality: "Choisy", postalCode: "60102" },
    { city: "Bel Ombre", locality: "Beau Champ", postalCode: "61001" },
    { city: "Bel Ombre", locality: "Bel Ombre", postalCode: "61002" },
    { city: "Bel Ombre", locality: "Cite EDC Bel Ombre", postalCode: "61003" },
    {
      city: "Bel Ombre",
      locality: "Cite Longtill Bel Ombre",
      postalCode: "61004",
    },
    { city: "Bel Ombre", locality: "Sainte Marie", postalCode: "61005" },
    { city: "Bel Ombre", locality: "Saint Martin", postalCode: "61006" },
    { city: "Bois Cheri", locality: "Rte Bois Cheri", postalCode: "81419" },
    { city: "Bois Cheri", locality: "Bois Cheri", postalCode: "80804" },
    { city: "Bois Cheri", locality: "Ahchin", postalCode: "60201" },
    { city: "Bois Cheri", locality: "Akla Road", postalCode: "60202" },
    { city: "Bois Cheri", locality: "Bois Cheri", postalCode: "60203" },
    { city: "Bois Cheri", locality: "Building", postalCode: "60204" },
    { city: "Bois Cheri", locality: "Cader Road", postalCode: "60205" },
    {
      city: "Bois Cheri",
      locality: "Cite EDC Bois Cheri",
      postalCode: "60206",
    },
    { city: "Bois Cheri", locality: "Cooperative", postalCode: "60207" },
    { city: "Bois Cheri", locality: "Heerallal Rd", postalCode: "60208" },
    { city: "Bois Cheri", locality: "Mambahal", postalCode: "60209" },
    { city: "Bois Cheri", locality: "Morc VRS", postalCode: "60210" },
    { city: "Bois Cheri", locality: "Porida", postalCode: "60211" },
    {
      city: "Bois Cheri",
      locality: "Residence Bois Cheri",
      postalCode: "60212",
    },
    { city: "Bois Cheri", locality: "Seeruttun Rd", postalCode: "60213" },
    { city: "Bois Cheri", locality: "Tivoli", postalCode: "60214" },
    {
      city: "Bambous Virieux",
      locality: "Bambous Virieux",
      postalCode: "50101",
    },
    { city: "Bambous Virieux", locality: "Debarcadere", postalCode: "50102" },
    { city: "Bambous Virieux", locality: "Les Mares", postalCode: "50103" },
    {
      city: "Bambous Virieux",
      locality: "Pointe Bambous",
      postalCode: "50104",
    },
    { city: "Benares", locality: "Plaine Verte 4", postalCode: "11612" },
    { city: "Benares", locality: "Plaine Verte 3", postalCode: "11611" },
    { city: "Benares", locality: "Plaine Verte 2", postalCode: "11503" },
    { city: "Benares", locality: "BENARES", postalCode: "61103" },
    { city: "Benares", locality: "BATIMARAIS", postalCode: "61101" },
    { city: "Benares", locality: "COLMAR", postalCode: "61102" },
    { city: "Bambous", locality: "PAILLOTTE (East)", postalCode: "73452" },
    { city: "Bambous", locality: "CITE ST LUC", postalCode: "74410" },
    { city: "Bambous", locality: "Rey", postalCode: "11121" },
    { city: "Bambous", locality: "Mangues Vert Doux", postalCode: "90106" },
    { city: "Bambous", locality: "Mon Repos", postalCode: "90107" },
    { city: "Bambous", locality: "Morc Eaux Bonnes", postalCode: "90108" },
    { city: "Bambous", locality: "Vaudagne", postalCode: "90109" },
    { city: "Bambous", locality: "Allee Tamarin", postalCode: "90101" },
    { city: "Bambous", locality: "Bambous", postalCode: "90102" },
    { city: "Bambous", locality: "Eaux Bonnes", postalCode: "90103" },
    { city: "Bambous", locality: "Geoffroy", postalCode: "90104" },
    { city: "Bambous", locality: "La Ferme", postalCode: "90105" },
    { city: "Black River", locality: "Cite EDC", postalCode: "90603" },
    { city: "Black River", locality: "Morc Ramdenee", postalCode: "90619" },
    { city: "Black River", locality: "Cite Tamarinier", postalCode: "90604" },
    { city: "Black River", locality: "Morc. Diocese", postalCode: "90620" },
    { city: "Black River", locality: "La Balise", postalCode: "90605" },
    { city: "Black River", locality: "Morc. Villaze", postalCode: "90621" },
    { city: "Black River", locality: "La Balise Marina", postalCode: "90606" },
    { city: "Black River", locality: "Nautica Complex", postalCode: "90622" },
    { city: "Black River", locality: "La Mivoie", postalCode: "90607" },
    {
      city: "Black River",
      locality: "Plantation Marguery",
      postalCode: "90623",
    },
    { city: "Black River", locality: "La Preneuse", postalCode: "90608" },
    {
      city: "Black River",
      locality: "River view Com Centre",
      postalCode: "90624",
    },
    { city: "Black River", locality: "La Tourelle View", postalCode: "90609" },
    {
      city: "Black River",
      locality: "Ruisseau Creole Complex",
      postalCode: "90625",
    },
    {
      city: "Black River",
      locality: "Les Salines/Morc. Plateau",
      postalCode: "90610",
    },
    { city: "Black River", locality: "West Island Villa", postalCode: "90626" },
    { city: "Black River", locality: "London Complex", postalCode: "90611" },
    { city: "Black River", locality: "Martello Complex", postalCode: "90612" },
    { city: "Black River", locality: "Matala Villa", postalCode: "90613" },
    { city: "Black River", locality: "Morc Carlos", postalCode: "90614" },
    { city: "Black River", locality: "Morc Filature", postalCode: "90615" },
    { city: "Black River", locality: "Morc Majo", postalCode: "90616" },
    { city: "Black River", locality: "Black River", postalCode: "90601" },
    { city: "Black River", locality: "Morc Mont Calme", postalCode: "90617" },
    { city: "Black River", locality: "Cite Carre D'As", postalCode: "90602" },
    { city: "Black River", locality: "Morc Paul Hein", postalCode: "90618" },
    { city: "Beau Vallon", locality: "Beau Vallon", postalCode: "52201" },
    { city: "Beau Vallon", locality: "Cite CHA", postalCode: "52202" },
    { city: "Beau Vallon", locality: "Cite NHDC", postalCode: "52203" },
    {
      city: "Beau Vallon",
      locality: "New Residential Area [Morc]",
      postalCode: "52204",
    },
    { city: "Beau Vallon", locality: "Verger", postalCode: "52205" },
    { city: "Bramsthan", locality: "Bramsthan", postalCode: "43201" },
    { city: "Bel Air", locality: "Bel Air", postalCode: "R6406" },
    { city: "Bel Air", locality: "Bel Air Saint Felix", postalCode: "60611" },
    { city: "Bel Air", locality: "Camp Vinson", postalCode: "52301" },
    { city: "Bel Air", locality: "Cemetery", postalCode: "52302" },
    { city: "Bel Air", locality: "Petit Bel Air", postalCode: "52303" },
    { city: "Bel Air", locality: "Grand Bel Air", postalCode: "50301" },
    { city: "Bel Air", locality: "Central", postalCode: "40107" },
    {
      city: "Bel Air",
      locality: "La Cheminee",
      postalCode: "40108",
    },
    {
      city: "Bel Air",
      locality: "Pont Lardier",
      postalCode: "40109",
    },
    { city: "Bel Air", locality: "Petit Bois", postalCode: "40110" },
    { city: "Bel Air", locality: "Pont Lardier", postalCode: "40111" },
    { city: "Bel Air", locality: "Saint Michel", postalCode: "40112" },
    { city: "Bel Air", locality: "Caroline", postalCode: "40102" },
    { city: "Bel Air", locality: "Ernest Florent", postalCode: "40103" },
    { city: "Bel Air", locality: "La Laura", postalCode: "40104" },
    { city: "Bel Air", locality: "La Lucie Roy", postalCode: "40105" },
    { city: "Bel Air", locality: "La Lucie Building", postalCode: "40106" },
    { city: "Brisee Verdiere", locality: "Pont Praslin", postalCode: "21612" },
    {
      city: "Brisee Verdiere",
      locality: "Latapie (western side)",
      postalCode: "42409",
    },
    {
      city: "Brisee Verdiere",
      locality: "Brisee Verdiere",
      postalCode: "42410",
    },
    {
      city: "Brisee Verdiere",
      locality: "Mare D'Australia",
      postalCode: "42411",
    },
    { city: "Brisee Verdiere", locality: "Belvedere", postalCode: "42403" },
    { city: "Camp de Masque", locality: "Bel Etang", postalCode: "41201" },
    { city: "Camp de Masque", locality: "Medine", postalCode: "41202" },
    { city: "Camp de Masque", locality: "Mont Ida", postalCode: "41203" },
    { city: "Camp de Masque", locality: "Mare Goys", postalCode: "40402" },
    { city: "Camp de Masque", locality: "Petite Cabane", postalCode: "40403" },
    { city: "Camp de Masque", locality: "Balance John", postalCode: "40301" },
    { city: "Camp de Masque", locality: "Camp De Masque", postalCode: "40302" },
    { city: "Camp de Masque", locality: "Camp Sonar", postalCode: "40303" },
    { city: "Camp de Masque", locality: "L' Unite", postalCode: "40304" },
    {
      city: "Camp de Masque",
      locality: "Camp De Masque P",
      postalCode: "40401",
    },
    { city: "Cap Malheureux", locality: "Anse La Raie", postalCode: "31701" },
    { city: "Cap Malheureux", locality: "Morc Garrib", postalCode: "31717" },
    { city: "Cap Malheureux", locality: "Bain Boeuf", postalCode: "31702" },
    { city: "Cap Malheureux", locality: "Morc Merven", postalCode: "31718" },
    { city: "Cap Malheureux", locality: "Calodyne", postalCode: "31703" },
    { city: "Cap Malheureux", locality: "Morc Rouillard", postalCode: "31719" },
    { city: "Cap Malheureux", locality: "Camp Gervaise", postalCode: "31704" },
    { city: "Cap Malheureux", locality: "Mosque Rd", postalCode: "31720" },
    { city: "Cap Malheureux", locality: "Cape Garden", postalCode: "31705" },
    { city: "Cap Malheureux", locality: "NHDC", postalCode: "31721" },
    { city: "Cap Malheureux", locality: "Cap Malheureux", postalCode: "31706" },
    { city: "Cap Malheureux", locality: "Pavillon", postalCode: "31722" },
    { city: "Cap Malheureux", locality: "Cayeux", postalCode: "31707" },
    { city: "Cap Malheureux", locality: "Pazani Mallaye", postalCode: "31723" },
    { city: "Cap Malheureux", locality: "C.H.A", postalCode: "31708" },
    {
      city: "Cap Malheureux",
      locality: "Quartier La Ligne",
      postalCode: "31724",
    },
    { city: "Cap Malheureux", locality: "Cite EDC", postalCode: "31709" },
    {
      city: "Cap Malheureux",
      locality: "Residence du Nord",
      postalCode: "31725",
    },
    { city: "Cap Malheureux", locality: "Jardin du Cap", postalCode: "31710" },
    { city: "Cap Malheureux", locality: "St Francois", postalCode: "31726" },
    {
      city: "Cap Malheureux",
      locality: "La Roue Charette",
      postalCode: "31711",
    },
    { city: "Cap Malheureux", locality: "Villa Maria Sq", postalCode: "31727" },
    {
      city: "Cap Malheureux",
      locality: "Mariamen Temple",
      postalCode: "31712",
    },
    {
      city: "Cap Malheureux",
      locality: "Agnis Ph 2",
      postalCode: "31713",
    },
    { city: "Cap Malheureux", locality: "Chetty 1", postalCode: "31714" },
    { city: "Cap Malheureux", locality: "Chetty 2", postalCode: "31715" },
    { city: "Cap Malheureux", locality: "Chetty 3", postalCode: "31716" },
    { city: "Chemin Grenier", locality: "New Mosque", postalCode: "60417" },
    { city: "Chemin Grenier", locality: "Adventist RD", postalCode: "60401" },
    {
      city: "Chemin Grenier",
      locality: "Plaine des Galets",
      postalCode: "60418",
    },
    { city: "Chemin Grenier", locality: "Camp Barbe", postalCode: "60402" },
    { city: "Chemin Grenier", locality: "PlayGround", postalCode: "60419" },
    { city: "Chemin Grenier", locality: "Railway", postalCode: "60420" },
    {
      city: "Chemin Grenier",
      locality: "Riviere des Galets",
      postalCode: "60421",
    },
    { city: "Chemin Grenier", locality: "Saint Felix", postalCode: "60422" },
    { city: "Chemin Grenier", locality: "Satanah", postalCode: "60423" },
    { city: "Case Noyale", locality: "Cite CHA", postalCode: "90303" },
    { city: "Case Noyale", locality: "Ilot Fortier", postalCode: "90304" },
    { city: "Case Noyale", locality: "Multipliants", postalCode: "90305" },
    {
      city: "Case Noyale",
      locality: "Petite Riviere Noire",
      postalCode: "90306",
    },
    {
      city: "Case Noyale",
      locality: "Carreau Eucalyptus",
      postalCode: "90301",
    },
    { city: "Case Noyale", locality: "Case Noyale", postalCode: "90302" },
    { city: "Chamarel", locality: "Terre 7 Couleurs", postalCode: "90409" },
    { city: "Chamarel", locality: "Camp Madras", postalCode: "90401" },
    { city: "Chamarel", locality: "Chamarel", postalCode: "90402" },
    { city: "Chamarel", locality: "La Vielle Cheminee", postalCode: "90403" },
    { city: "Chamarel", locality: "La Ville Leon", postalCode: "90404" },
    { city: "Chamarel", locality: "Les Rouleaux", postalCode: "90405" },
    { city: "Chamarel", locality: "Piton", postalCode: "90406" },
    { city: "Chamarel", locality: "Societe St Denis", postalCode: "90407" },
    { city: "Chamarel", locality: "Ste Anne", postalCode: "90408" },
    { city: "Central Flacq", locality: "Morc Hospital", postalCode: "40614" },
    { city: "Central Flacq", locality: "Morc Robillard", postalCode: "40615" },
    { city: "Central Flacq", locality: "Nehru Nagar", postalCode: "40616" },
    {
      city: "Central Flacq",
      locality: "Plaine De Gersigny",
      postalCode: "40617",
    },
    { city: "Central Flacq", locality: "Riche Mare", postalCode: "40618" },
    { city: "Central Flacq", locality: "Saint Remy", postalCode: "40619" },
    { city: "Central Flacq", locality: "Morc Argy", postalCode: "40613" },
    {
      city: "Central Flacq",
      locality: "Belle Vue Allendy",
      postalCode: "40601",
    },
    { city: "Central Flacq", locality: "Boulet Blanc", postalCode: "40602" },
    { city: "Central Flacq", locality: "Boulet Rouge", postalCode: "40603" },
    { city: "Central Flacq", locality: "Boutique Coco", postalCode: "40604" },
    { city: "Central Flacq", locality: "Camp Garreau", postalCode: "40605" },
    { city: "Central Flacq", locality: "Central Flacq", postalCode: "40606" },
    { city: "Central Flacq", locality: "Cite Argy", postalCode: "40607" },
    { city: "Central Flacq", locality: "Cite Hibiscus", postalCode: "40608" },
    { city: "Central Flacq", locality: "Constance S.E", postalCode: "40609" },
    {
      city: "Central Flacq",
      locality: "Domaine La Colombe",
      postalCode: "40610",
    },
    { city: "Central Flacq", locality: "Hermitage", postalCode: "40611" },
    { city: "Central Flacq", locality: "La Source", postalCode: "40612" },
    { city: "Camp Diable", locality: "NHDC Camp Diable", postalCode: "60305" },
    { city: "Camp Diable", locality: "Riche Bois", postalCode: "60306" },
    { city: "Camp Diable", locality: "EDC Camp Diable", postalCode: "60301" },
    { city: "Camp Diable", locality: "Morc Savannah", postalCode: "60302" },
    { city: "Camp Diable", locality: "Ilot", postalCode: "60303" },
    { city: "Camp Diable", locality: "Camp Diable", postalCode: "60304" },
    { city: "Cottage", locality: "Roselyn Cottage", postalCode: "81418" },
    { city: "Cottage", locality: "Cite C.H.A", postalCode: "30201" },
    { city: "Cottage", locality: "Cottage North", postalCode: "30202" },
    { city: "Cottage", locality: "Cottage South", postalCode: "30203" },
    { city: "Cottage", locality: "Morc Beau Plateau", postalCode: "30204" },
    { city: "Cottage", locality: "Morc Kestrel", postalCode: "30205" },
    { city: "Cottage", locality: "Morc VRS", postalCode: "30206" },
    { city: "Cottage", locality: "NHDC", postalCode: "30207" },
    { city: "Cluny", locality: "Cluny Rd", postalCode: "52104" },
    { city: "Cluny", locality: "Bemanique", postalCode: "50501" },
    { city: "Cluny", locality: "Camp Bengali", postalCode: "50502" },
    { city: "Cluny", locality: "Camp Ramdin", postalCode: "50503" },
    { city: "Cluny", locality: "Cluny", postalCode: "50504" },
    { city: "Cluny", locality: "Eau Bleue Tostee", postalCode: "50505" },
    { city: "Cluny", locality: "Railway", postalCode: "50506" },
    { city: "Chamouny", locality: "Mare Anguilles", postalCode: "61302" },
    { city: "Chamouny", locality: "Mont Blanc", postalCode: "61303" },
    { city: "Chamouny", locality: "Chamouny", postalCode: "61301" },
    { city: "Camp Carol", locality: "Camp Carol", postalCode: "51601" },
    { city: "Camp Carol", locality: "Camp Carol", postalCode: "30512" },
    { city: "Camp Carol", locality: "Camp Carol", postalCode: "52401" },
    { city: "Camp Carol", locality: "Carreau Acacia", postalCode: "52402" },
    { city: "Camp Carol", locality: "La Cambuse", postalCode: "52403" },
    { city: "Camp Carol", locality: "Le Bouchon", postalCode: "52404" },
    {
      city: "Camp Carol",
      locality: "Mon Desert Mon Tresor",
      postalCode: "52405",
    },
    {
      city: "Camp Carol",
      locality: "Morc. V.R.S M. Desert",
      postalCode: "52406",
    },
    { city: "Calebasses", locality: "Calebasses", postalCode: "20201" },
    { city: "Calebasses", locality: "Koyratty", postalCode: "20202" },
    { city: "Calebasses", locality: "L'Espoir", postalCode: "20203" },
    { city: "Calebasses", locality: "Old Flacq", postalCode: "20204" },
    { city: "Creve Coeur", locality: "Creve Coeur", postalCode: "R5111" },
    { city: "Creve Coeur", locality: "Creve Coeur", postalCode: "20401" },
    { city: "Creve Coeur", locality: "Morc. Creve", postalCode: "20402" },
    { city: "Creve Coeur", locality: "Ripaille 1/2/3", postalCode: "20403" },
    {
      city: "Creve Coeur",
      locality: "Robinson (Right side)",
      postalCode: "20404",
    },
    { city: "Creve Coeur", locality: "Thomassin", postalCode: "20405" },
    { city: "Creve Coeur", locality: "Upper C. Coeur", postalCode: "20406" },
    { city: "Congomah", locality: "Congomah", postalCode: "20301" },
    { city: "Congomah", locality: "Cite E.D.C", postalCode: "20302" },
    { city: "Congomah", locality: "Royal Rd", postalCode: "20303" },
    { city: "Casclle", locality: "Beau Songes", postalCode: "90201" },
    { city: "Casclle", locality: "Camp Creoles", postalCode: "90202" },
    { city: "Casclle", locality: "Casclle", postalCode: "90203" },
    { city: "Casclle", locality: "Xavier", postalCode: "90204" },
    { city: "Camp Ithier", locality: "Camp Ithier", postalCode: "40501" },
    { city: "Camp Ithier", locality: "Isidore Rose", postalCode: "40502" },
    { city: "Camp Ithier", locality: "Isidore Rose P", postalCode: "40503" },
    { city: "Clemencia", locality: "Belle Rose", postalCode: "40701" },
    { city: "Clemencia", locality: "Clemencia", postalCode: "40702" },
    { city: "Curepipe", locality: "Flat St. Antoine", postalCode: "74311" },
    { city: "Curepipe", locality: "Robinson 1", postalCode: "74527" },
    { city: "Curepipe", locality: "Galeries Y. Palach", postalCode: "74412" },
    { city: "Curepipe", locality: "Robinson 2", postalCode: "74528" },
    { city: "Curepipe", locality: "Garden", postalCode: "74213" },
    { city: "Curepipe", locality: "Robinson 3", postalCode: "74529" },
    { city: "Curepipe", locality: "Higginson", postalCode: "74414" },
    { city: "Curepipe", locality: "Royal College", postalCode: "74430" },
    { city: "Curepipe", locality: "Ian Palach", postalCode: "74415" },
    { city: "Curepipe", locality: "Salaffa Region", postalCode: "74431" },
    { city: "Curepipe", locality: "Les Casernes", postalCode: "74216" },
    { city: "Curepipe", locality: "Ste Therese", postalCode: "74432" },
    { city: "Curepipe", locality: "Arcades Currimjee", postalCode: "74501" },
    { city: "Curepipe", locality: "L.Geoffroy", postalCode: "74517" },
    { city: "Curepipe", locality: "Stevenson", postalCode: "74533" },
    { city: "Curepipe", locality: "Barracks", postalCode: "74502" },
    { city: "Curepipe", locality: "Malartic", postalCode: "74418" },
    { city: "Curepipe", locality: "Talipots", postalCode: "74234" },
    { city: "Curepipe", locality: "B. Sequard", postalCode: "74503" },
    { city: "Curepipe", locality: "Malherbes", postalCode: "74319" },
    { city: "Curepipe", locality: "Thomy D'Arifat", postalCode: "74335" },
    { city: "Curepipe", locality: "Charles Lees", postalCode: "74404" },
    { city: "Curepipe", locality: "Morc Faucon", postalCode: "74220" },
    { city: "Curepipe", locality: "W. Churchill", postalCode: "74536" },
    { city: "Curepipe", locality: "Clos de la tour", postalCode: "74405" },
    { city: "Curepipe", locality: "Morc.Senneville", postalCode: "74221" },
    { city: "Curepipe", locality: "Commerford", postalCode: "74506" },
    { city: "Curepipe", locality: "Morc Souchon", postalCode: "74222" },
    { city: "Curepipe", locality: "Commerson", postalCode: "74407" },
    { city: "Curepipe", locality: "Municipality", postalCode: "74423" },
    { city: "Curepipe", locality: "E. Laurent", postalCode: "74208" },
    { city: "Curepipe", locality: "Noelville", postalCode: "74224" },
    { city: "Curepipe", locality: "Flat Lotus", postalCode: "74309" },
    { city: "Curepipe", locality: "Queen Elizabeth", postalCode: "74425" },
    { city: "Curepipe", locality: "Flat Mesnil", postalCode: "74410" },
    { city: "Curepipe", locality: "R.Gujadhur", postalCode: "74426" },
    { city: "Dubreuil", locality: "Dubreuil", postalCode: "81501" },
    { city: "Dubreuil", locality: "NHDC Dubreuil", postalCode: "81502" },
    { city: "Dubreuil", locality: "Rishi Dayanand", postalCode: "81503" },
    { city: "Dubreuil", locality: "Samlo", postalCode: "81504" },
    { city: "Dagotiere", locality: "L'Assurance", postalCode: "80201" },
    { city: "Dagotiere", locality: "Lower Dagotiere", postalCode: "80202" },
    { city: "Dagotiere", locality: "NHDC Dagotiere", postalCode: "80203" },
    { city: "Dagotiere", locality: "Upper Dagotiere", postalCode: "80204" },
    { city: "Dagotiere", locality: "Valetta", postalCode: "80205" },
    { city: "Ecroignard", locality: "Ecroignard", postalCode: "40801" },
    { city: "Ebene", locality: "Ebene Views", postalCode: "72231" },
    { city: "Ebene", locality: "Morc Bega-Ebene", postalCode: "80817" },
    {
      city: "Ebene",
      locality: "Morc Bout Du Monde-Ebene",
      postalCode: "80818",
    },
    { city: "Ebene", locality: "Ebene Cybercity", postalCode: "72201" },
    {
      city: "Ebene",
      locality: "Ebene S.E (Ebene Housing Estate)",
      postalCode: "72202",
    },
    { city: "Ebene", locality: "Morc Ebene", postalCode: "72203" },
    {
      city: "Eau Coulee",
      locality: "E.Coulee Royal Rd 2",
      postalCode: "74321",
    },
    { city: "Eau Coulee", locality: "Morc. Adam", postalCode: "74337" },
    { city: "Eau Coulee", locality: "Terre Coupe", postalCode: "74553" },
    {
      city: "Eau Coulee",
      locality: "E.Coulee (Hissandee-C.Cheron)",
      postalCode: "74222",
    },
    { city: "Eau Coulee", locality: "Morc. Baptiste", postalCode: "74338" },
    { city: "Eau Coulee", locality: "Tout Court", postalCode: "74354" },
    { city: "Eau Coulee", locality: "Engrais Cathan", postalCode: "74323" },
    { city: "Eau Coulee", locality: "Morc. Camphriers", postalCode: "74339" },
    { city: "Eau Coulee", locality: "Trou Aux Cerfs", postalCode: "74555" },
    { city: "Eau Coulee", locality: "Camp Rouillard", postalCode: "74208" },
    { city: "Eau Coulee", locality: "Engrais Martial 1", postalCode: "74124" },
    { city: "Eau Coulee", locality: "Morc. Cantin", postalCode: "74340" },
    { city: "Eau Coulee", locality: "Villa Chambly", postalCode: "74356" },
    { city: "Eau Coulee", locality: "Castel", postalCode: "74109" },
    { city: "Eau Coulee", locality: "Engrais Martial 2", postalCode: "74225" },
    { city: "Eau Coulee", locality: "Morc. Hossenbux", postalCode: "74341" },
    { city: "Eau Coulee", locality: "Cite du Pavillon", postalCode: "74310" },
    { city: "Eau Coulee", locality: "Flat Bahemia", postalCode: "74226" },
    { city: "Eau Coulee", locality: "Municipal House", postalCode: "74342" },
    { city: "Eau Coulee", locality: "Cite Malherbes B", postalCode: "74311" },
    { city: "Eau Coulee", locality: "Flat Baissac", postalCode: "74327" },
    { city: "Eau Coulee", locality: "NHDC Complex", postalCode: "74343" },
    { city: "Eau Coulee", locality: "Cite Malherbes A", postalCode: "74312" },
    { city: "Eau Coulee", locality: "Flat Bonomally", postalCode: "74328" },
    { city: "Eau Coulee", locality: "NHDC Prevert", postalCode: "74344" },
    { city: "Eau Coulee", locality: "Cite Rivet", postalCode: "74313" },
    { city: "Eau Coulee", locality: "Flat Henessy", postalCode: "74229" },
    { city: "Eau Coulee", locality: "Pope Henessy 1", postalCode: "74245" },
    { city: "Eau Coulee", locality: "Cite Souchon", postalCode: "74314" },
    { city: "Eau Coulee", locality: "Flat Joomun", postalCode: "74330" },
    { city: "Eau Coulee", locality: "Pope Henessy 2", postalCode: "74446" },
    { city: "Eau Coulee", locality: "Clement Charoux", postalCode: "74315" },
    { city: "Eau Coulee", locality: "Hissandee", postalCode: "74231" },
    { city: "Eau Coulee", locality: "Quatre Carreaux", postalCode: "74347" },
    {
      city: "Eau Coulee",
      locality: "Couvent De Lorette Road",
      postalCode: "74316",
    },
    { city: "Eau Coulee", locality: "La Mairee", postalCode: "74232" },
    { city: "Eau Coulee", locality: "Remono", postalCode: "74248" },
    {
      city: "Eau Coulee",
      locality: "Cpe Rd (Dove st-De sornay st)",
      postalCode: "74217",
    },
    { city: "Eau Coulee", locality: "Lapeyrouse", postalCode: "74233" },
    { city: "Eau Coulee", locality: "Morc Burtun 111", postalCode: "74334" },
    { city: "Eau Coulee", locality: "Robinson", postalCode: "74550" },
    {
      city: "Eau Coulee",
      locality: "Daruty De Grand Pre 1",
      postalCode: "74218",
    },
    { city: "Eau Coulee", locality: "Morc Piat", postalCode: "74235" },
    {
      city: "Eau Coulee",
      locality: "Royal Rd Shell- Pope Henessy",
      postalCode: "74451",
    },
    {
      city: "Eau Coulee",
      locality: "E.Coulee Royal Rd 1",
      postalCode: "74220",
    },
    { city: "Eau Coulee", locality: "Morc Nasapen", postalCode: "74336" },
    { city: "Eau Coulee", locality: "Sir William Newton", postalCode: "74252" },
    { city: "Eau Coulee", locality: "Camp Dhoby", postalCode: "74305" },
    { city: "Eau Coulee", locality: "Camp Levieux", postalCode: "74306" },
    { city: "Eau Coulee", locality: "Camp Pierrot", postalCode: "74207" },
    { city: "Eau Coulee", locality: "Abbe de la caille", postalCode: "74301" },
    { city: "Eau Coulee", locality: "Abbe Laval", postalCode: "74202" },
    { city: "Eau Coulee", locality: "Bougainville", postalCode: "74203" },
    { city: "Eau Coulee", locality: "Camp Caval", postalCode: "74504" },
    { city: "Flic en Flac", locality: "Mouettes", postalCode: "90510" },
    { city: "Flic en Flac", locality: "Morc Safeland 1", postalCode: "90511" },
    { city: "Flic en Flac", locality: "Morc Safeland 2", postalCode: "90512" },
    { city: "Flic en Flac", locality: "Morc Safeland 3", postalCode: "90513" },
    { city: "Flic en Flac", locality: "Morc Palmyre", postalCode: "90514" },
    {
      city: "Flic en Flac",
      locality: "Residence St Jacques",
      postalCode: "90515",
    },
    { city: "Flic en Flac", locality: "Sand Hotel", postalCode: "90516" },
    { city: "Flic en Flac", locality: "Carriere", postalCode: "90501" },
    { city: "Flic en Flac", locality: "Sofitel Hotel", postalCode: "90517" },
    { city: "Flic en Flac", locality: "Souffleurs", postalCode: "90518" },
    { city: "Flic en Flac", locality: "Hilton Hotel", postalCode: "90503" },
    { city: "Flic en Flac", locality: "La Pirogue", postalCode: "90504" },
    { city: "Flic en Flac", locality: "Manguiers", postalCode: "90505" },
    { city: "Flic en Flac", locality: "Wolmar", postalCode: "90521" },
    { city: "Flic en Flac", locality: "Morc Anna 1", postalCode: "90506" },
    { city: "Flic en Flac", locality: "Morc Anna 2", postalCode: "90507" },
    { city: "Flic en Flac", locality: "Morc Bismic", postalCode: "90508" },
    { city: "Flic en Flac", locality: "Morc de Chazal", postalCode: "90509" },
    { city: "Fond du Sac", locality: "Fond du Sac East", postalCode: "20601" },
    { city: "Fond du Sac", locality: "Fond du Sac West", postalCode: "20602" },
    { city: "Fond du Sac", locality: "Morc Dilchand", postalCode: "20603" },
    { city: "16eme Mille", locality: "Morc Sookary", postalCode: "52606" },
    {
      city: "16eme Mille",
      locality: "RAMPHUL 1",
      postalCode: "52607",
    },
    {
      city: "16eme Mille",
      locality: "RAMPHUL 2",
      postalCode: "52608",
    },
    { city: "16eme Mille", locality: "Seizieme Mile", postalCode: "52609" },
    { city: "16eme Mille", locality: "Cite Anoushka", postalCode: "52601" },
    { city: "16eme Mille", locality: "Cite Mon Bois", postalCode: "52602" },
    { city: "16eme Mille", locality: "Coriolis", postalCode: "52603" },
    {
      city: "16eme Mille",
      locality: "Mon Bois (cnt+ubs+laiterie)",
      postalCode: "52604",
    },
    { city: "16eme Mille", locality: "Morc Domah", postalCode: "52605" },
    {
      city: "Grande Retraite",
      locality: "Bois d'Oiseaux",
      postalCode: "43302",
    },
    {
      city: "Grande Retraite",
      locality: "Petite Retraite",
      postalCode: "43303",
    },
    {
      city: "Grande Retraite",
      locality: "Grande Retraite",
      postalCode: "43301",
    },
    { city: "Grand Gaube", locality: "Citerne", postalCode: "30608" },
    { city: "Grand Gaube", locality: "St Jean Bosco", postalCode: "30624" },
    { city: "Grand Gaube", locality: "Cite EDC", postalCode: "30609" },
    { city: "Grand Gaube", locality: "Sin Fat", postalCode: "30625" },
    {
      city: "Grand Gaube",
      locality: "Complex Paul et Virginie",
      postalCode: "30610",
    },
    {
      city: "Grand Gaube",
      locality: "St Joseph Roc en Roc",
      postalCode: "30626",
    },
    {
      city: "Grand Gaube",
      locality: "Complex Melville No 1",
      postalCode: "30611",
    },
    { city: "Grand Gaube", locality: "St Michel", postalCode: "30627" },
    {
      city: "Grand Gaube",
      locality: "Complex Melville No 2",
      postalCode: "30612",
    },
    {
      city: "Grand Gaube",
      locality: "Complex Melville No 3",
      postalCode: "30613",
    },
    {
      city: "Grand Gaube",
      locality: "Complex Melville No 4",
      postalCode: "30614",
    },
    { city: "Grand Gaube", locality: "Couacaud", postalCode: "30615" },
    { city: "Grand Gaube", locality: "Germain", postalCode: "30616" },
    { city: "Grand Gaube", locality: "Arya Mandir", postalCode: "30601" },
    { city: "Grand Gaube", locality: "Grand Gaube", postalCode: "30617" },
    { city: "Grand Gaube", locality: "Batie", postalCode: "30602" },
    { city: "Grand Gaube", locality: "John Kennedy", postalCode: "30618" },
    { city: "Grand Gaube", locality: "Butte a L'Herbe", postalCode: "30603" },
    {
      city: "Grand Gaube",
      locality: "La Lucie Residence",
      postalCode: "30619",
    },
    { city: "Grand Gaube", locality: "Calodyne", postalCode: "30604" },
    {
      city: "Grand Gaube",
      locality: "Morc Agnis Phase 1",
      postalCode: "30620",
    },
    { city: "Grand Gaube", locality: "Camp Corail", postalCode: "30605" },
    { city: "Grand Gaube", locality: "Nelson", postalCode: "30621" },
    { city: "Grand Gaube", locality: "Camp Madras", postalCode: "30606" },
    { city: "Grand Gaube", locality: "Pere Glorieux", postalCode: "30622" },
    { city: "Grand Gaube", locality: "Camp Petrol", postalCode: "30607" },
    {
      city: "Grand Gaube",
      locality: "Quartier des Lauriers",
      postalCode: "30623",
    },
    { city: "Grand Bay", locality: "Morc Le Caleche", postalCode: "30531" },
    { city: "Grand Bay", locality: "Pointe D'Azur", postalCode: "30547" },
    { city: "Grand Bay", locality: "Morc Swan", postalCode: "30532" },
    { city: "Grand Bay", locality: "Richmond Hill", postalCode: "30548" },
    { city: "Grand Bay", locality: "Morc Foondun", postalCode: "30533" },
    { city: "Grand Bay", locality: "Racket", postalCode: "30549" },
    { city: "Grand Bay", locality: "La Mare Ronde", postalCode: "30518" },
    { city: "Grand Bay", locality: "Morc Unicorn", postalCode: "30534" },
    { city: "Grand Bay", locality: "Sottise", postalCode: "30550" },
    { city: "Grand Bay", locality: "Super U", postalCode: "30551" },
    { city: "Grand Bay", locality: "Morc Raffray (a)", postalCode: "30520" },
    { city: "Grand Bay", locality: "Moulin Casse", postalCode: "30536" },
    { city: "Grand Bay", locality: "Morc Raffray (b)", postalCode: "30521" },
    { city: "Grand Bay", locality: "Morc Chetty", postalCode: "30537" },
    { city: "Grand Bay", locality: "Morc Raffray (c)", postalCode: "30522" },
    {
      city: "Grand Bay",
      locality: "Morc Villa Pereybere",
      postalCode: "30538",
    },
    { city: "Grand Bay", locality: "Morc Raffray (d)", postalCode: "30523" },
    { city: "Grand Bay", locality: "Morc Le Corsaire", postalCode: "30524" },
    { city: "Grand Bay", locality: "Morc Jaulim", postalCode: "30540" },
    { city: "Grand Bay", locality: "Mont Choisy (s.e)", postalCode: "30525" },
    { city: "Grand Bay", locality: "Morc Berth", postalCode: "30526" },
    { city: "Grand Bay", locality: "Morc Jitsing", postalCode: "30542" },
    {
      city: "Grand Bay",
      locality: "Mont Choisy Shopping Mall",
      postalCode: "30527",
    },
    { city: "Grand Bay", locality: "Macumba", postalCode: "30544" },
    { city: "Grand Bay", locality: "Morc Boucan", postalCode: "30529" },
    { city: "Grand Bay", locality: "Pereybere", postalCode: "30546" },
    { city: "Grand Bay", locality: "Dodo Square", postalCode: "30514" },
    { city: "Grand Bay", locality: "Les Bougainvilliers", postalCode: "30516" },
    { city: "Grand Bay", locality: "La Croisette", postalCode: "30517" },
    { city: "Grand Bay", locality: "Aquamarine", postalCode: "30501" },
    { city: "Grand Bay", locality: "Bazar", postalCode: "30502" },
    { city: "Grand Bay", locality: "Bain Boeuf", postalCode: "30503" },
    { city: "Grand Bay", locality: "Beau Manguier", postalCode: "30504" },
    { city: "Grand Bay", locality: "Camp Harel", postalCode: "30505" },
    { city: "Grand Bay", locality: "Cite EDC", postalCode: "30506" },
    { city: "Grand Bay", locality: "Cite CHA", postalCode: "30507" },
    { city: "Grand Bay", locality: "Cite Lumiere", postalCode: "30508" },
    { city: "Grand Bay", locality: "Camp Huradon", postalCode: "30509" },
    { city: "Grand Bay", locality: "Coastal Rd", postalCode: "30510" },
    { city: "Grand Bay", locality: "Camp Lamour", postalCode: "30511" },
    { city: "Grand Bay", locality: "Camp Carol", postalCode: "30512" },
    { city: "Grand Bay", locality: "Chemin Vingt Pied", postalCode: "30513" },
    { city: "Grand Sable", locality: "Camp Balma", postalCode: "50601" },
    { city: "Grand Sable", locality: "Camp Pierre", postalCode: "50602" },
    { city: "Grand Sable", locality: "Grand Sable", postalCode: "50603" },
    { city: "Grand Sable", locality: "Petit Sable", postalCode: "50604" },
    { city: "Grand Sable", locality: "Plaine Des Roches", postalCode: "50605" },
    { city: "Grand Sable", locality: "Pointe Des Roches", postalCode: "50606" },
    { city: "Goodlands", locality: "Madame Azor", postalCode: "30408" },
    {
      city: "Goodlands",
      locality: "Mamzelle Jeanne (Wlk II) & (Wlk III)",
      postalCode: "30409",
    },
    { city: "Goodlands", locality: "Mapon Leclezio", postalCode: "30410" },
    { city: "Goodlands", locality: "Morc Petit Village", postalCode: "30411" },
    { city: "Goodlands", locality: "Morc St Antoine", postalCode: "30412" },
    { city: "Goodlands", locality: "Mosque Sq", postalCode: "30413" },
    { city: "Goodlands", locality: "New Morc Goodlands", postalCode: "30414" },
    { city: "Goodlands", locality: "Petit Village", postalCode: "30415" },
    { city: "Goodlands", locality: "Plateau", postalCode: "30416" },
    { city: "Goodlands", locality: "Arya Mandir", postalCode: "30401" },
    { city: "Goodlands", locality: "Railway Sq", postalCode: "30417" },
    { city: "Goodlands", locality: "Astoria", postalCode: "30402" },
    { city: "Goodlands", locality: "Reservoir", postalCode: "30418" },
    { city: "Goodlands", locality: "Balkan", postalCode: "30403" },
    { city: "Goodlands", locality: "Soobany Sq", postalCode: "30419" },
    { city: "Goodlands", locality: "Bois Rouge", postalCode: "30404" },
    {
      city: "Goodlands",
      locality: "St Antoine Industrial Zone",
      postalCode: "30420",
    },
    { city: "Goodlands", locality: "CEB Sq", postalCode: "30405" },
    { city: "Goodlands", locality: "Triangle", postalCode: "30421" },
    { city: "Goodlands", locality: "Cite Ste Claire", postalCode: "30406" },
    { city: "Goodlands", locality: "Domaine du Moulin", postalCode: "30407" },
    { city: "Grand Bel Air", locality: "Grand Bel Air", postalCode: "50301" },
    {
      city: "Grande Rivière Sud Est",
      locality: "ANAHITA IRS+HOTEL",
      postalCode: "40901",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "Beau Champ",
      postalCode: "40902",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "Beau Champ S.E (ALTEO)",
      postalCode: "40903",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "Camp Pecheurs",
      postalCode: "40904",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "FOUR SEASONS+HOTEL",
      postalCode: "40905",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "Grande River South East",
      postalCode: "40906",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "Morc VRS",
      postalCode: "40907",
    },
    {
      city: "Grande Rivière Sud Est",
      locality: "Quartier",
      postalCode: "40908",
    },
    { city: "La Flora", locality: "Matoo Rd", postalCode: "61705" },
    { city: "La Flora", locality: "Pamplemousses Rd", postalCode: "61706" },
    { city: "La Flora", locality: "Rioux", postalCode: "61707" },
    { city: "La Flora", locality: "Seebaruth Rd", postalCode: "61708" },
    { city: "La Flora", locality: "Bostom Rd", postalCode: "61701" },
    { city: "La Flora", locality: "Cooperative Rd", postalCode: "61702" },
    { city: "La Flora", locality: "Kanhye Rd", postalCode: "61703" },
    { city: "La Flora", locality: "La Flora", postalCode: "61704" },
    { city: "Lalmatie", locality: "Lalmatie", postalCode: "42601" },
    { city: "Lalmatie", locality: "Mission Cross", postalCode: "42602" },
    { city: "Lalmatie", locality: "Belvedere", postalCode: "42603" },
    {
      city: "Lalmatie",
      locality: "Grand Bas Fond (southern part)",
      postalCode: "42604",
    },
    { city: "Le Hochet", locality: "Morc. Foondun", postalCode: "21806" },
    { city: "Le Hochet", locality: "Morc. Goolamally 1", postalCode: "21807" },
    { city: "Le Hochet", locality: "Morc. Goolamally 2", postalCode: "21808" },
    { city: "Le Hochet", locality: "Morc Manick", postalCode: "21809" },
    { city: "Le Hochet", locality: "Morc Motee", postalCode: "21810" },
    { city: "Le Hochet", locality: "Morc. Raffray 1", postalCode: "21811" },
    { city: "Le Hochet", locality: "Morc. Raffray 2", postalCode: "21812" },
    { city: "Le Hochet", locality: "Riche Terre", postalCode: "21813" },
    {
      city: "Le Hochet",
      locality: "Riche Terre Ind Zone",
      postalCode: "21814",
    },
    {
      city: "Terre Rouge",
      locality: " Bleuets 2, Morc Raffray",
      postalCode: "21812",
    },
    {
      city: "Le Hochet",
      locality: "Terre Rouge (village)",
      postalCode: "21815",
    },
    { city: "Le Hochet", locality: "Cite C.H.A", postalCode: "21801" },
    { city: "Le Hochet", locality: "Cite Roma", postalCode: "21802" },
    { city: "Le Hochet", locality: "Jumbo", postalCode: "21803" },
    { city: "Le Hochet", locality: "La Fontaine 23", postalCode: "21804" },
    { city: "Le Hochet", locality: "Le Hochet", postalCode: "21805" },
    { city: "La Gaulette", locality: "Coteau Raffin", postalCode: "91101" },
    { city: "La Gaulette", locality: "La Gaulette", postalCode: "91102" },
    { city: "La Gaulette", locality: "Morc Desveaux", postalCode: "91103" },
    { city: "La Gaulette", locality: "Morc La Fleche", postalCode: "91104" },
    { city: "Le Morne", locality: "Le Morne Village", postalCode: "91203" },
    { city: "Le Morne", locality: "La Prairie", postalCode: "91204" },
    { city: "Le Morne", locality: "Morc Gambien", postalCode: "91205" },
    { city: "Le Morne", locality: "Dilo Pourie", postalCode: "91201" },
    { city: "Le Morne", locality: "Le Morne Brabant", postalCode: "91202" },
    {
      city: "Lnture",
      locality: "MONT ROCHES H.lnture",
      postalCode: "71405",
    },
    {
      city: "Lnture",
      locality: "Lnture Long Mountain",
      postalCode: "41001",
    },
    { city: "Lnture", locality: "E.D.C. B", postalCode: "20808" },
    { city: "Lnture", locality: "Les Mariannes", postalCode: "20809" },
    { city: "Lnture", locality: "L'Industrie", postalCode: "20810" },
    { city: "Lnture", locality: "Morc. Baillache", postalCode: "20811" },
    { city: "Lnture", locality: "Morc. Nouvelle", postalCode: "20812" },
    {
      city: "Lnture",
      locality: "Robinson (Left Side)",
      postalCode: "20813",
    },
    { city: "Lnture", locality: "Valton", postalCode: "20814" },
    { city: "Lnture", locality: "Baillache", postalCode: "20801" },
    { city: "Lnture", locality: "Boulingrin", postalCode: "20802" },
    {
      city: "Lnture",
      locality: "Camp la Boue/ Vallee du Paradis",
      postalCode: "20803",
    },
    { city: "Lnture", locality: "C.H.A", postalCode: "20804" },
    { city: "Lnture", locality: "Cite Social Welfare", postalCode: "20805" },
    { city: "Lnture", locality: "Descoins", postalCode: "20806" },
    {
      city: "Lnture",
      locality: "E.D.C. A La laura / malenga",
      postalCode: "20807",
    },
    { city: "Lnture", locality: "Malinga", postalCode: "80503" },
    { city: "Lnture", locality: "La Laura", postalCode: "80501" },
    {
      city: "Lnture",
      locality: "LA LAURA/Riv Baptiste",
      postalCode: "80502",
    },
    { city: "Melrose", locality: "Melrose", postalCode: "80701" },
    { city: "Melrose", locality: "NHDC Melrose", postalCode: "80702" },
    {
      city: "Medine Camp de Masque",
      locality: "Bel Etang",
      postalCode: "41201",
    },
    { city: "Medine Camp de Masque", locality: "Medine", postalCode: "41202" },
    {
      city: "Medine Camp de Masque",
      locality: "Mont Ida",
      postalCode: "41203",
    },
    { city: "Morc St Andre", locality: "Morc St Andrews", postalCode: "71336" },
    { city: "Morc St Andre", locality: "Cite Cremation", postalCode: "20901" },
    {
      city: "Morc St Andre",
      locality: "Morc St Andre East",
      postalCode: "20902",
    },
    {
      city: "Morc St Andre",
      locality: "Morc St Andre West",
      postalCode: "20903",
    },
    { city: "Morc St Andre", locality: "Morc VRS", postalCode: "20904" },
    { city: "Mare D'Albert", locality: "None", postalCode: "None" },
    { city: "Mahebourg", locality: "Maurice St", postalCode: "50811" },
    { city: "Mahebourg", locality: "Morc. Lorette", postalCode: "50812" },
    { city: "Mahebourg", locality: "Museum", postalCode: "50813" },
    { city: "Mahebourg", locality: "Pointe Canon", postalCode: "50814" },
    { city: "Mahebourg", locality: "Pointe D'Esny", postalCode: "50815" },
    { city: "Mahebourg", locality: "Pte des Regates", postalCode: "50816" },
    { city: "Mahebourg", locality: "Allee Gheude", postalCode: "50801" },
    { city: "Mahebourg", locality: "Pte Jerome", postalCode: "50817" },
    { city: "Mahebourg", locality: "Quartier", postalCode: "50818" },
    { city: "Mahebourg", locality: "Bois D'oiseaux", postalCode: "50803" },
    { city: "Mahebourg", locality: "Remy Ollier", postalCode: "50819" },
    { city: "Mahebourg", locality: "Carreau Manioc", postalCode: "50804" },
    { city: "Mahebourg", locality: "Tombeau", postalCode: "50820" },
    { city: "Mahebourg", locality: "Cent Gaulettes", postalCode: "50805" },
    { city: "Mahebourg", locality: "Ville Noire", postalCode: "50821" },
    { city: "Mahebourg", locality: "Cite La Chaux", postalCode: "50806" },
    { city: "Mahebourg", locality: "Villeneuve", postalCode: "50822" },
    { city: "Mahebourg", locality: "Debarcadere", postalCode: "50807" },
    { city: "Mahebourg", locality: "Waterfront", postalCode: "50823" },
    { city: "Mahebourg", locality: "Hospital", postalCode: "50808" },
    { city: "Mahebourg", locality: "Ile aux deux cocos", postalCode: "50809" },
    { city: "Mahebourg", locality: "Mahebourg", postalCode: "50810" },
    { city: "Mapou", locality: "Pointe/palmiste/mapou", postalCode: "R1335" },
    { city: "Mapou", locality: "Camp Mapou", postalCode: "73106" },
    { city: "Mapou", locality: "Labourdonnais", postalCode: "31803" },
    { city: "Mapou", locality: "Mapou", postalCode: "31804" },
    { city: "Mapou", locality: "Morc B.Plateau", postalCode: "31805" },
    { city: "Mapou", locality: "Morc BelleVue", postalCode: "31806" },
    { city: "Mapou", locality: "Morc Hiilside", postalCode: "31807" },
    { city: "Mapou", locality: "NHDC", postalCode: "31808" },
    { city: "Mapou", locality: "Cite S.I.L.W.F", postalCode: "31801" },
    { city: "Mapou", locality: "Ferret", postalCode: "31802" },
    { city: "Mare La Chaux", locality: "Camp Creole", postalCode: "41101" },
    { city: "Mare La Chaux", locality: "Mare La Chaux", postalCode: "41102" },
    { city: "Mare Tabac", locality: "Gros Bois Rd", postalCode: "51105" },
    { city: "Mare Tabac", locality: "Joli Bois", postalCode: "51106" },
    { city: "Mare Tabac", locality: "Jugoo Bhunjun", postalCode: "51107" },
    { city: "Mare Tabac", locality: "Mare Tabac", postalCode: "51108" },
    { city: "Mare Tabac", locality: "Morc SIT", postalCode: "51109" },
    { city: "Mare Tabac", locality: "NHDC Mare Tabac", postalCode: "51110" },
    { city: "Mare Tabac", locality: "Aspral", postalCode: "51101" },
    { city: "Mare Tabac", locality: "Camp Francois", postalCode: "51102" },
    { city: "Mare Tabac", locality: "Cite CHA", postalCode: "51103" },
    { city: "Mare Tabac", locality: "Cite Greenwood", postalCode: "51104" },
    { city: "Midlands", locality: "Midlands", postalCode: "52501" },
    { city: "Midlands", locality: "Morc Ferret", postalCode: "52502" },
    { city: "Midlands", locality: "Morc Ramdanee", postalCode: "52503" },
    { city: "Midlands", locality: "Morc St Therese", postalCode: "52504" },
    {
      city: "Moka",
      locality: "Rose Hill Centre 7, Moka Rd (J.Nyerere)",
      postalCode: "71366",
    },
    { city: "Moka", locality: "Bell Village", postalCode: "11202" },
    { city: "Moka", locality: "Camp Chapelon East", postalCode: "11204" },
    { city: "Moka", locality: "University Of Mauritius", postalCode: "80837" },
    { city: "Moka", locality: "Morc Mon Desert", postalCode: "80821" },
    { city: "Moka", locality: "Les Allees d'Helvetia 1", postalCode: "80840" },
    { city: "Moka", locality: "Morc Mon Plaisir", postalCode: "80822" },
    { city: "Moka", locality: "Les Allees d'Helvetia 2", postalCode: "80838" },
    { city: "Moka", locality: "Morc Noel", postalCode: "80823" },
    { city: "Moka", locality: "Les Allees d'Helvetia 3", postalCode: "80839" },
    { city: "Moka", locality: "Morc Paratian", postalCode: "80824" },
    { city: "Moka", locality: "Mount ORY", postalCode: "80825" },
    { city: "Moka", locality: "Pont Souillac", postalCode: "80826" },
    { city: "Moka", locality: "Railway Square", postalCode: "80827" },
    { city: "Moka", locality: "Residence Cybervillage", postalCode: "80828" },
    { city: "Moka", locality: "Telfair", postalCode: "80829" },
    { city: "Moka", locality: "Valory", postalCode: "80830" },
    { city: "Moka", locality: "Vinson", postalCode: "80831" },
    { city: "Moka", locality: "Bagatelle Mall", postalCode: "80832" },
    { city: "Moka", locality: "Martindale", postalCode: "80833" },
    { city: "Moka", locality: "Reduit", postalCode: "80835" },
    { city: "Moka", locality: "STATE HOUSE", postalCode: "80836" },
    { city: "Moka", locality: "Bois Cheri", postalCode: "80804" },
    { city: "Moka", locality: "Morc Hein", postalCode: "80820" },
    { city: "Moka", locality: "Bon Air (+ villa road)", postalCode: "80805" },
    { city: "Moka", locality: "Camp Samy", postalCode: "80806" },
    { city: "Moka", locality: "Chantenay", postalCode: "80807" },
    { city: "Moka", locality: "Cite Mahatma Gandhi", postalCode: "80808" },
    { city: "Moka", locality: "Cite Telfair", postalCode: "80809" },
    { city: "Moka", locality: "Gentilly", postalCode: "80810" },
    {
      city: "Moka",
      locality: "Gentilly Estate (new morc MDA)",
      postalCode: "80811",
    },
    {
      city: "Moka",
      locality: "Mauritius Broadcasting Corporation (MBC)",
      postalCode: "80812",
    },
    { city: "Moka", locality: "Moka Business Centre", postalCode: "80813" },
    { city: "Moka", locality: "MOKA EYE HOSPITAL", postalCode: "80814" },
    { city: "Moka", locality: "Moka Village", postalCode: "80815" },
    { city: "Moka", locality: "Morc Bagatelle", postalCode: "80816" },
    { city: "Moka", locality: "Appartment Le Ravin", postalCode: "80801" },
    { city: "Moka", locality: "Morc Bega-Ebene", postalCode: "80817" },
    { city: "Moka", locality: "Baboolall RD", postalCode: "80802" },
    { city: "Moka", locality: "Morc Bout Du Monde-Ebene", postalCode: "80818" },
    { city: "Moka", locality: "Bocage", postalCode: "80803" },
    { city: "Moka", locality: "Morc Eureka", postalCode: "80819" },
    { city: "New Grove", locality: "Deux Bras", postalCode: "51208" },
    { city: "New Grove", locality: "Siding", postalCode: "51224" },
    { city: "New Grove", locality: "Deux Bras S.E", postalCode: "51209" },
    { city: "New Grove", locality: "Gros Billot", postalCode: "51210" },
    { city: "New Grove", locality: "Gros Billot Branch", postalCode: "51211" },
    { city: "New Grove", locality: "Kalimaye", postalCode: "51212" },
    { city: "New Grove", locality: "La Rosa", postalCode: "51213" },
    { city: "New Grove", locality: "Mare Chicose", postalCode: "51214" },
    { city: "New Grove", locality: "Mont Fertille", postalCode: "51215" },
    { city: "New Grove", locality: "Morc Balance", postalCode: "51216" },
    { city: "New Grove", locality: "Astroea Rochecouste", postalCode: "51201" },
    { city: "New Grove", locality: "Morc Dreepaul", postalCode: "51217" },
    { city: "New Grove", locality: "Bamboo", postalCode: "51202" },
    { city: "New Grove", locality: "Morc Ganga", postalCode: "51218" },
    { city: "New Grove", locality: "Bois D'oiseaux", postalCode: "51203" },
    { city: "New Grove", locality: "Morc Gaytree", postalCode: "51219" },
    { city: "New Grove", locality: "Business Park", postalCode: "51204" },
    { city: "New Grove", locality: "Morc Mauripark", postalCode: "51220" },
    { city: "New Grove", locality: "Cite La Rosa", postalCode: "51205" },
    { city: "New Grove", locality: "Morc VRS", postalCode: "51221" },
    { city: "New Grove", locality: "Cite Mont Fertile", postalCode: "51206" },
    { city: "New Grove", locality: "New Grove", postalCode: "51222" },
    { city: "New Grove", locality: "Cite NHDC", postalCode: "51207" },
    { city: "New Grove", locality: "Parasol", postalCode: "51223" },
    { city: "Nouvelle France", locality: "Commelonne", postalCode: "51303" },
    { city: "Nouvelle France", locality: "Grand Port Rd", postalCode: "51304" },
    { city: "Nouvelle France", locality: "Kanpur", postalCode: "51305" },
    { city: "Nouvelle France", locality: "La Peyre", postalCode: "51306" },
    { city: "Nouvelle France", locality: "Morc B.Climat", postalCode: "51307" },
    {
      city: "Nouvelle France",
      locality: "N.H.D.C N.France",
      postalCode: "51308",
    },
    { city: "Nouvelle France", locality: "N.France", postalCode: "51309" },
    { city: "Nouvelle France", locality: "Pont Colville", postalCode: "51310" },
    {
      city: "Nouvelle France",
      locality: "Residence U.Park",
      postalCode: "51311",
    },
    { city: "Nouvelle France", locality: "Savanne Rd", postalCode: "51312" },
    { city: "Nouvelle France", locality: "Seegoolam Rd", postalCode: "51313" },
    { city: "Nouvelle France", locality: "Bemanique", postalCode: "51301" },
    {
      city: "Nouvelle France",
      locality: "Bissoondoyal Rd",
      postalCode: "51302",
    },
    {
      city: "Notre Dame",
      locality: "ROSE HILL CENTRE 3 Notre Dame De Lourdes",
      postalCode: "71362",
    },
    { city: "Notre Dame", locality: "N.H.D.C.Valton", postalCode: "22011" },
    { city: "Notre Dame", locality: "Platform", postalCode: "22012" },
    { city: "Notre Dame", locality: "Church Square", postalCode: "22001" },
    { city: "Notre Dame", locality: "Montee Jolie", postalCode: "22002" },
    { city: "Notre Dame", locality: "Morc. Kitchine", postalCode: "22003" },
    { city: "Notre Dame", locality: "Morc L'Amitie", postalCode: "22004" },
    { city: "Notre Dame", locality: "Morc.La Rochelle", postalCode: "22005" },
    { city: "Notre Dame", locality: "Morc Teeluck", postalCode: "22006" },
    { city: "Notre Dame", locality: "Morc VRS", postalCode: "22007" },
    { city: "Notre Dame", locality: "Notre Dame", postalCode: "22008" },
    { city: "Notre Dame", locality: "N.H.D.C Baillache", postalCode: "22009" },
    { city: "Notre Dame", locality: "N.H.D.C.Church", postalCode: "22010" },
    {
      city: "Nouvelle Decouverte",
      locality: "Nouvelle Decouverte",
      postalCode: "R6425",
    },
    {
      city: "Nouvelle Decouverte",
      locality: "Nouvelle Decouverte",
      postalCode: "81201",
    },
    { city: "Old Grand Port", locality: "Le Vallon", postalCode: "51405" },
    { city: "Old Grand Port", locality: "Old Grand Port", postalCode: "51406" },
    {
      city: "Old Grand Port",
      locality: "Belle Vue /Kenya",
      postalCode: "51401",
    },
    { city: "Old Grand Port", locality: "Cite NHDC", postalCode: "51402" },
    { city: "Old Grand Port", locality: "Debarcadere", postalCode: "51403" },
    { city: "Old Grand Port", locality: "Ferney", postalCode: "51404" },
    { city: "Olivia", locality: "Louis Renaud", postalCode: "41408" },
    { city: "Olivia", locality: "Morc Deep River", postalCode: "41409" },
    { city: "Olivia", locality: "Morc Hamid", postalCode: "41410" },
    { city: "Olivia", locality: "Morc Louis Renaud", postalCode: "41411" },
    { city: "Olivia", locality: "Morc Trois Ilots", postalCode: "41412" },
    { city: "Olivia", locality: "Morc VRS Kewal Nagar", postalCode: "41413" },
    { city: "Olivia", locality: "Olivia", postalCode: "41414" },
    { city: "Olivia", locality: "Plaines Bananes", postalCode: "41415" },
    { city: "Olivia", locality: "Rousset Rd (Olivia)", postalCode: "41416" },
    { city: "Olivia", locality: "Camp Beau Bois", postalCode: "41401" },
    { city: "Olivia", locality: "SILWF - Olivia", postalCode: "41417" },
    { city: "Olivia", locality: "Camp Jakeeree", postalCode: "41402" },
    { city: "Olivia", locality: "CHA + (state land)", postalCode: "41403" },
    { city: "Olivia", locality: "Deep River S.E", postalCode: "41404" },
    { city: "Olivia", locality: "EDC", postalCode: "41405" },
    {
      city: "Olivia",
      locality: "Kewal Nagar (Belle Rive)",
      postalCode: "41406",
    },
    { city: "Olivia", locality: "la Nourrice", postalCode: "41407" },
    {
      city: "Post de Flacq",
      locality: "One and only (St Geran Hotel)",
      postalCode: "41521",
    },
    { city: "Post de Flacq", locality: "Poste Lafayette", postalCode: "41519" },
    { city: "Post de Flacq", locality: "Railway", postalCode: "41520" },
    { city: "Post de Flacq", locality: "Cite Perdu", postalCode: "41505" },
    { city: "Post de Flacq", locality: "Choisy", postalCode: "41506" },
    { city: "Post de Flacq", locality: "Cremation", postalCode: "41507" },
    { city: "Post de Flacq", locality: "Debarcadere", postalCode: "41508" },
    { city: "Post de Flacq", locality: "Jardin", postalCode: "41509" },
    { city: "Post de Flacq", locality: "Kashinath", postalCode: "41510" },
    { city: "Post de Flacq", locality: "La Pointe", postalCode: "41511" },
    { city: "Post de Flacq", locality: "La Porte", postalCode: "41512" },
    { city: "Post de Flacq", locality: "Morc Constance", postalCode: "41513" },
    { city: "Post de Flacq", locality: "Morc Janoo", postalCode: "41514" },
    { city: "Post de Flacq", locality: "Morc Monet", postalCode: "41515" },
    { city: "Post de Flacq", locality: "Morc Providence", postalCode: "41516" },
    { city: "Post de Flacq", locality: "Bras d'Eau", postalCode: "41501" },
    { city: "Post de Flacq", locality: "Pont Blanc", postalCode: "41517" },
    { city: "Post de Flacq", locality: "Camp Accacia", postalCode: "41502" },
    { city: "Post de Flacq", locality: "Poste de Flacq", postalCode: "41518" },
    { city: "Post de Flacq", locality: "Camp Poorun", postalCode: "41503" },
    { city: "Post de Flacq", locality: "Camp Raffia", postalCode: "41504" },
    { city: "Gros Cailloux", locality: "Croisee Chebel", postalCode: "90701" },
    { city: "Gros Cailloux", locality: "Gros Cailloux", postalCode: "90702" },
    { city: "Gros Cailloux", locality: "Morc Domah", postalCode: "90703" },
    {
      city: "Gros Cailloux",
      locality: "Morc Gros Cailloux",
      postalCode: "90807",
    },
    {
      city: "Petite Riviere",
      locality: "Camp des Embrevades",
      postalCode: "90801",
    },
    {
      city: "Petite Riviere",
      locality: "Camp Racket (Benoit)",
      postalCode: "90802",
    },
    { city: "Petite Riviere", locality: "Canon Casse", postalCode: "90803" },
    { city: "Petite Riviere", locality: "Cite Betel", postalCode: "90804" },
    {
      city: "Petite Riviere",
      locality: "Cite Flamboyant (NHDC)",
      postalCode: "90805",
    },
    { city: "Petite Riviere", locality: "Morc Goldsmith", postalCode: "90806" },
    {
      city: "Petite Riviere",
      locality: "Morc Gros Cailloux",
      postalCode: "90807",
    },
    { city: "Petite Riviere", locality: "Petite Riviere", postalCode: "90808" },
    {
      city: "Petite Riviere",
      locality: "Petite Riviere Noire",
      postalCode: "90306",
    },
    { city: "Piton", locality: "La Butte Region", postalCode: "11314" },
    { city: "Piton", locality: "La Paix", postalCode: "30806" },
    { city: "Piton", locality: "Mon Piton", postalCode: "30807" },
    { city: "Piton", locality: "Morc Le Haut Champs", postalCode: "30808" },
    { city: "Piton", locality: "NHDC", postalCode: "30809" },
    { city: "Piton", locality: "Beau Sejour", postalCode: "30801" },
    { city: "Piton", locality: "Beau Sejour SE", postalCode: "30802" },
    { city: "Piton", locality: "Bon Espoir", postalCode: "30803" },
    { city: "Piton", locality: "Cite EDC", postalCode: "30804" },
    { city: "Piton", locality: "Espe Piton", postalCode: "30805" },
    { city: "Piton", locality: "Piton", postalCode: "90406" },
    {
      city: "Plaine des Papayes",
      locality: "Morc Ramphul",
      postalCode: "21210",
    },
    {
      city: "Plaine des Papayes",
      locality: "Morc Seebundhun",
      postalCode: "21211",
    },
    { city: "Plaine des Papayes", locality: "Morc VRS", postalCode: "21212" },
    {
      city: "Plaine des Papayes",
      locality: "P.Papayes East",
      postalCode: "21213",
    },
    {
      city: "Plaine des Papayes",
      locality: "P.Papayes West",
      postalCode: "21214",
    },
    {
      city: "Plaine des Papayes",
      locality: "Theo Maigrot Sq",
      postalCode: "21215",
    },
    {
      city: "Plaine des Papayes",
      locality: "Bois Mangue",
      postalCode: "21201",
    },
    { city: "Plaine des Papayes", locality: "Camp Maraz", postalCode: "21202" },
    { city: "Plaine des Papayes", locality: "Cite EDC", postalCode: "21203" },
    { city: "Plaine des Papayes", locality: "Cite NHDC", postalCode: "21204" },
    {
      city: "Plaine des Papayes",
      locality: "Morc Beau Plan",
      postalCode: "21205",
    },
    {
      city: "Plaine des Papayes",
      locality: "Morc Blue Nile",
      postalCode: "21206",
    },
    {
      city: "Plaine des Papayes",
      locality: "Morc Chummun",
      postalCode: "21207",
    },
    {
      city: "Plaine des Papayes",
      locality: "Morc Dauhoo",
      postalCode: "21208",
    },
    {
      city: "Plaine des Papayes",
      locality: "Morc Koonjoo",
      postalCode: "21209",
    },
    { city: "Petit Raffray", locality: "Morc Loderchand", postalCode: "30709" },
    { city: "Petit Raffray", locality: "Moulin au vent", postalCode: "30710" },
    {
      city: "Petit Raffray",
      locality: "Petit Raffray Village 1",
      postalCode: "30711",
    },
    {
      city: "Petit Raffray",
      locality: "Petit Raffray Village 2",
      postalCode: "30712",
    },
    { city: "Petit Raffray", locality: "Reunion Maurel", postalCode: "30713" },
    { city: "Petit Raffray", locality: "St Francois", postalCode: "30714" },
    { city: "Petit Raffray", locality: "Union Daruty", postalCode: "30715" },
    { city: "Petit Raffray", locality: "Union Delcourt", postalCode: "30716" },
    { city: "Petit Raffray", locality: "Camp Mayeux", postalCode: "30701" },
    { city: "Petit Raffray", locality: "Les Charmose", postalCode: "30702" },
    { city: "Petit Raffray", locality: "Mare Seche", postalCode: "30703" },
    { city: "Petit Raffray", locality: "Mont Mascal", postalCode: "30704" },
    { city: "Petit Raffray", locality: "Morc Bholah", postalCode: "30705" },
    {
      city: "Petit Raffray",
      locality: "Morc Gowreesunkur 1",
      postalCode: "30706",
    },
    {
      city: "Petit Raffray",
      locality: "Morc Gowreesunkur 2",
      postalCode: "30707",
    },
    { city: "Petit Raffray", locality: "Morc Harrangee", postalCode: "30708" },
    { city: "Providence", locality: "Cite Providence", postalCode: "81601" },
    { city: "Providence", locality: "Providence", postalCode: "81602" },
    { city: "Providence", locality: "Providencia 1", postalCode: "81603" },
    { city: "Providence", locality: "Providencia 2", postalCode: "81604" },
    { city: "Providence", locality: "Providencia 3", postalCode: "81605" },
    { city: "Providence", locality: "Morc Providence", postalCode: "41516" },
    { city: "Providence", locality: "Providence", postalCode: "50404" },
    { city: "Pointe aux Piments", locality: "Camp Lilas", postalCode: "21301" },
    { city: "Pointe aux Piments", locality: "Camp Sada", postalCode: "21302" },
    {
      city: "Pointe aux Piments",
      locality: "Camp Scipion",
      postalCode: "21303",
    },
    {
      city: "Pointe aux Piments",
      locality: "Grande Pointe aux Piments",
      postalCode: "21304",
    },
    {
      city: "Pointe aux Piments",
      locality: "Morc Brizmohun",
      postalCode: "21305",
    },
    {
      city: "Pointe aux Piments",
      locality: "Petite Pointe aux Piments",
      postalCode: "21306",
    },
    { city: "Plaine Magnien", locality: "Mon desert Rd", postalCode: "51512" },
    { city: "Plaine Magnien", locality: "Morc Gobin", postalCode: "51513" },
    { city: "Plaine Magnien", locality: "Morc Ithier", postalCode: "51514" },
    {
      city: "Plaine Magnien",
      locality: "NHDC les Palmiers",
      postalCode: "51515",
    },
    { city: "Plaine Magnien", locality: "Plaine Magnien", postalCode: "51516" },
    {
      city: "Plaine Magnien",
      locality: "Agricultural Extension Office",
      postalCode: "51501",
    },
    {
      city: "Plaine Magnien",
      locality: "Rishi dayanand Rd",
      postalCode: "51517",
    },
    { city: "Plaine Magnien", locality: "Balance", postalCode: "51502" },
    {
      city: "Plaine Magnien",
      locality: "Ruisseau Copeaux",
      postalCode: "51518",
    },
    { city: "Plaine Magnien", locality: "Bois D'Oiseau", postalCode: "51503" },
    { city: "Plaine Magnien", locality: "Solitude", postalCode: "51519" },
    { city: "Plaine Magnien", locality: "Cemetry Rd", postalCode: "51504" },
    {
      city: "Plaine Magnien",
      locality: "SSR International Airport",
      postalCode: "51520",
    },
    {
      city: "Plaine Magnien",
      locality: "Chatgaon (ex Airport)",
      postalCode: "51505",
    },
    {
      city: "Plaine Magnien",
      locality: "Cite Burrenchobay",
      postalCode: "51506",
    },
    {
      city: "Plaine Magnien",
      locality: "Cite EDC Balance",
      postalCode: "51507",
    },
    { city: "Plaine Magnien", locality: "La Cambuse", postalCode: "51508" },
    { city: "Plaine Magnien", locality: "La Grotte", postalCode: "51509" },
    { city: "Plaine Magnien", locality: "Le Chaland", postalCode: "51510" },
    { city: "Plaine Magnien", locality: "Madame Dayla", postalCode: "51511" },
    { city: "Pamplemousses", locality: "St Croix 1", postalCode: "11704" },
    { city: "Pamplemousses", locality: "St Croix 2", postalCode: "11705" },
    {
      city: "Pamplemousses",
      locality: "Paul Toureau Region",
      postalCode: "11702",
    },
    { city: "Pamplemousses", locality: "Sixth Mile", postalCode: "21016" },
    {
      city: "Pamplemousses",
      locality: "S.S.R.N.Hospital",
      postalCode: "21017",
    },
    { city: "Pamplemousses", locality: "Pamplemousses", postalCode: "21014" },
    { city: "Pamplemousses", locality: "Riviere Citron", postalCode: "21015" },
    { city: "Pamplemousses", locality: "Beau Plan", postalCode: "21001" },
    { city: "Pamplemousses", locality: "Bois Rouge", postalCode: "21002" },
    {
      city: "Pamplemousses",
      locality: "Botanical Garden",
      postalCode: "21003",
    },
    { city: "Pamplemousses", locality: "Canton Nancy", postalCode: "21004" },
    {
      city: "Pamplemousses",
      locality: "Canton Belle Eau",
      postalCode: "21005",
    },
    { city: "Pamplemousses", locality: "Camp Badamiers", postalCode: "21006" },
    {
      city: "Pamplemousses",
      locality: "Camp d Embrevades",
      postalCode: "21007",
    },
    { city: "Pamplemousses", locality: "Cite E.D.C", postalCode: "21008" },
    { city: "Pamplemousses", locality: "La Louisa", postalCode: "21009" },
    { city: "Pamplemousses", locality: "Mon Plaisir", postalCode: "21010" },
    { city: "Pamplemousses", locality: "Monc. Ripaille", postalCode: "21011" },
    { city: "Pamplemousses", locality: "Mon Rocher", postalCode: "21012" },
    {
      city: "Pamplemousses",
      locality: "Monc.Maison Blanche",
      postalCode: "21013",
    },
    {
      city: "Pamplemousses",
      locality: "Pamplemousses Rd",
      postalCode: "61706",
    },
    { city: "Petit Bel Air", locality: "Camp Vinson", postalCode: "52301" },
    { city: "Petit Bel Air", locality: "Cemetery", postalCode: "52302" },
    { city: "Petit Bel Air", locality: "Petit Bel Air", postalCode: "52303" },
    { city: "Queen Victoria", locality: "Bonne Mere", postalCode: "42701" },
    {
      city: "Queen Victoria",
      locality: "Camp Bonne Mere",
      postalCode: "42702",
    },
    { city: "Queen Victoria", locality: "NHDC B Mere", postalCode: "42703" },
    { city: "Queen Victoria", locality: "Queen Victoria", postalCode: "42704" },
    {
      city: "Quatre Soeurs",
      locality: "Deux Freres Seaside",
      postalCode: "52702",
    },
    { city: "Quatre Soeurs", locality: "Marie Jeanne", postalCode: "52703" },
    { city: "Quatre Soeurs", locality: "Mr Joly", postalCode: "52704" },
    {
      city: "Quatre Soeurs",
      locality: "Pointe aux Feuilles",
      postalCode: "52705",
    },
    {
      city: "Quatre Soeurs",
      locality: "Deux Freres Mountain side",
      postalCode: "52701",
    },
    { city: "Roches Noires", locality: "Azuri Complex", postalCode: "31201" },
    { city: "Roches Noires", locality: "Coastal Side", postalCode: "31202" },
    {
      city: "Roches Noires",
      locality: "Domaine du levant",
      postalCode: "31203",
    },
    { city: "Roches Noires", locality: "Haute Rive", postalCode: "31204" },
    { city: "Roches Noires", locality: "Lambic", postalCode: "31205" },
    {
      city: "Roches Noires",
      locality: "Roches Noires Village",
      postalCode: "31206",
    },
    { city: "Roches Noires", locality: "Branch Rd", postalCode: "31207" },
    { city: "Roches Noires", locality: "Sidine", postalCode: "31208" },
    {
      city: "Richelieu",
      locality: "Royal Rd from Emmaus to Richelieu Branch Rd",
      postalCode: "71608",
    },
    { city: "Richelieu", locality: "Allee Tamarin", postalCode: "91301" },
    { city: "Richelieu", locality: "Cite Richelieu", postalCode: "91302" },
    { city: "Richelieu", locality: "Platform", postalCode: "91303" },
    { city: "Richelieu", locality: "Richelieu", postalCode: "91304" },
    {
      city: "Roche Terre",
      locality: "Roche Terre Street",
      postalCode: "11703",
    },
    { city: "Roche Terre", locality: "Calasse", postalCode: "32001" },
    { city: "Roche Terre", locality: "Roche Terre", postalCode: "32002" },
    { city: "Riviere du Poste", locality: "Camp Rabaud", postalCode: "60701" },
    { city: "Riviere du Poste", locality: "Camp Siajee", postalCode: "60702" },
    { city: "Riviere du Poste", locality: "Riv du Poste", postalCode: "60703" },
    {
      city: "Riviere du Poste",
      locality: "Terrain Maurice",
      postalCode: "60704",
    },
    {
      city: "Riviere des Creoles",
      locality: "Camp Carol",
      postalCode: "51601",
    },
    { city: "Riviere des Creoles", locality: "Cite CHA", postalCode: "51602" },
    {
      city: "Riviere des Creoles",
      locality: "Cite Longtill",
      postalCode: "51603",
    },
    {
      city: "Riviere des Creoles",
      locality: "Morc Ferney, VRS",
      postalCode: "51604",
    },
    {
      city: "Riviere des Creoles",
      locality: "Pte Brocus",
      postalCode: "51605",
    },
    {
      city: "Riviere des Creoles",
      locality: "Riviere des Creoles",
      postalCode: "51606",
    },
    { city: "Ripailles", locality: "Ripailles", postalCode: "82001" },
    {
      city: "Phoenix",
      locality: "RESIDENCE TRIANON (delivery by Phoenix P.O)",
      postalCode: "72260",
    },
    {
      city: "Phoenix",
      locality: "LE MERIT (delivery by Phoenix P.O)",
      postalCode: "72228",
    },
    {
      city: "Phoenix",
      locality: "MORC DOOKUN 2 (Mun of Vac/Phoenix)",
      postalCode: "73361",
    },
    { city: "Phoenix", locality: "Boundary", postalCode: "73605" },
    { city: "Phoenix", locality: "Highlands", postalCode: "73621" },
    { city: "Phoenix", locality: "Mosque Rd", postalCode: "73637" },
    { city: "Phoenix", locality: "Valentina", postalCode: "73553" },
    { city: "Phoenix", locality: "Camp Fouquereaux 1", postalCode: "73606" },
    { city: "Phoenix", locality: "Highlands Branch Rd", postalCode: "73622" },
    { city: "Phoenix", locality: "Nalletamby", postalCode: "73538" },
    { city: "Phoenix", locality: "Camp Fouquereaux 2", postalCode: "73607" },
    { city: "Phoenix", locality: "Independence", postalCode: "73423" },
    { city: "Phoenix", locality: "Nehru", postalCode: "73539" },
    { city: "Phoenix", locality: "Camp Fouquereaux 3", postalCode: "73608" },
    { city: "Phoenix", locality: "Jumbo", postalCode: "73524" },
    { city: "Phoenix", locality: "Ollier", postalCode: "73440" },
    {
      city: "Phoenix",
      locality: "Camp Fouquereaux Bch Rd",
      postalCode: "73609",
    },
    { city: "Phoenix", locality: "LE Meritt", postalCode: "73525" },
    { city: "Phoenix", locality: "Palmerstone", postalCode: "73541" },
    { city: "Phoenix", locality: "Camp Hosany", postalCode: "73610" },
    { city: "Phoenix", locality: "Les Halles", postalCode: "73526" },
    { city: "Phoenix", locality: "Petit Camp", postalCode: "73542" },
    { city: "Phoenix", locality: "Castel", postalCode: "73611" },
    { city: "Phoenix", locality: "Mesnil", postalCode: "73627" },
    { city: "Phoenix", locality: "Pine wood Garden", postalCode: "73643" },
    { city: "Phoenix", locality: "Cinq Arpents", postalCode: "73612" },
    { city: "Phoenix", locality: "Morc Blue Print", postalCode: "73628" },
    { city: "Phoenix", locality: "Pont Fer", postalCode: "73544" },
    { city: "Phoenix", locality: "Cite 50", postalCode: "73613" },
    { city: "Phoenix", locality: "Morc Boucan", postalCode: "73529" },
    { city: "Phoenix", locality: "Riverside", postalCode: "73645" },
    { city: "Phoenix", locality: "Clairfonds 1", postalCode: "73514" },
    { city: "Phoenix", locality: "Morc Koenig", postalCode: "73630" },
    { city: "Phoenix", locality: "Robinson 1", postalCode: "73546" },
    { city: "Phoenix", locality: "Clairfonds 3", postalCode: "73515" },
    { city: "Phoenix", locality: "Morc Lonrho", postalCode: "73631" },
    { city: "Phoenix", locality: "Robinson 3", postalCode: "73547" },
    { city: "Phoenix", locality: "Clairfonds 2", postalCode: "73516" },
    { city: "Phoenix", locality: "Morc Lenoir", postalCode: "73532" },
    { city: "Phoenix", locality: "Robinson 2", postalCode: "73548" },
    { city: "Phoenix", locality: "Allee Brillant", postalCode: "73501" },
    { city: "Phoenix", locality: "Closel", postalCode: "73417" },
    { city: "Phoenix", locality: "Morc MTMD", postalCode: "73633" },
    { city: "Phoenix", locality: "Sawmill", postalCode: "73549" },
    { city: "Phoenix", locality: "Allee Jacques", postalCode: "73502" },
    { city: "Phoenix", locality: "Flat River Islands", postalCode: "73518" },
    { city: "Phoenix", locality: "Morc Nazroo", postalCode: "73634" },
    {
      city: "Phoenix",
      locality: "Sayed Hossen Highlands Bch",
      postalCode: "73650",
    },
    { city: "Phoenix", locality: "Bassin", postalCode: "73603" },
    { city: "Phoenix", locality: "Hassen Raffa", postalCode: "73619" },
    { city: "Phoenix", locality: "Morc Noel", postalCode: "73535" },
    { city: "Phoenix", locality: "St. Paul", postalCode: "73551" },
    { city: "Phoenix", locality: "Belle Terre", postalCode: "73604" },
    { city: "Phoenix", locality: "Hermitage", postalCode: "73620" },
    { city: "Phoenix", locality: "Morc Trianon", postalCode: "73536" },
    { city: "Phoenix", locality: "Tout Court", postalCode: "73652" },
    { city: "Pointe aux Sables", locality: "Link Rd", postalCode: "11129" },
    { city: "Pointe aux Sables", locality: "Flamboyants", postalCode: "11129" },
    { city: "Pointe aux Sables", locality: "Printemps", postalCode: "11129" },
    { city: "Pointe aux Sables", locality: "Royal Rd", postalCode: "11129" },
    { city: "Pointe aux Sables", locality: "Cite Lateka", postalCode: "11105" },
    {
      city: "Pointe aux Sables",
      locality: "Rey",
      postalCode: "11121",
    },
    {
      city: "Pointe aux Sables",
      locality: "Cite La Lumiere",
      postalCode: "11106",
    },
    {
      city: "Pointe aux Sables",
      locality: "Ghurburrun",
      postalCode: "11122",
    },
    { city: "Pointe aux Sables", locality: "Kensington", postalCode: "11107" },
    {
      city: "Pointe aux Sables",
      locality: "S.L.D.C",
      postalCode: "11123",
    },
    {
      city: "Pointe aux Sables",
      locality: "La Tour Koenig Phase I & Phase 2",
      postalCode: "11108",
    },
    {
      city: "Pointe aux Sables",
      locality: "Sohun",
      postalCode: "11124",
    },
    {
      city: "Pointe aux Sables",
      locality: "La Tour Koenig Industrial Zone",
      postalCode: "11109",
    },
    {
      city: "Pointe aux Sables",
      locality: "Soobra Phase 1 & Phase 2",
      postalCode: "11125",
    },
    {
      city: "Pointe aux Sables",
      locality: "Marguerite Phase 1",
      postalCode: "11110",
    },
    {
      city: "Pointe aux Sables",
      locality: "Verger Mangue",
      postalCode: "11126",
    },
    {
      city: "Pointe aux Sables",
      locality: "D'Hotman",
      postalCode: "11111",
    },
    {
      city: "Pointe aux Sables",
      locality: "Verger Le Bain",
      postalCode: "11127",
    },
    {
      city: "Pointe aux Sables",
      locality: "Fon Sing",
      postalCode: "11112",
    },
    {
      city: "Pointe aux Sables",
      locality: "Verger Sur Mer",
      postalCode: "11128",
    },
    {
      city: "Pointe aux Sables",
      locality: "Fortune",
      postalCode: "11113",
    },
    {
      city: "Pointe aux Sables",
      locality: "Pointe aux Sables",
      postalCode: "11129",
    },
    {
      city: "Pointe aux Sables",
      locality: "Ghurburrun Ph 1 Brunes Pailles Phase 2",
      postalCode: "11114",
    },
    { city: "Pointe aux Sables", locality: "Police Flat", postalCode: "11130" },
    {
      city: "Pointe aux Sables",
      locality: "Ibrahim Dawood",
      postalCode: "11115",
    },
    {
      city: "Pointe aux Sables",
      locality: "Residence Coquillage",
      postalCode: "11131",
    },
    {
      city: "Pointe aux Sables",
      locality: "Ilois Phase 1 & Phase 2",
      postalCode: "11116",
    },
    {
      city: "Pointe aux Sables",
      locality: "Residence La Tourelle 1 & 2",
      postalCode: "11132",
    },
    {
      city: "Pointe aux Sables",
      locality: "Camp Firinga",
      postalCode: "11101",
    },
    {
      city: "Pointe aux Sables",
      locality: "Koenig/sur mer",
      postalCode: "11117",
    },
    { city: "Pointe aux Sables", locality: "Terrasson 1", postalCode: "11133" },
    {
      city: "Pointe aux Sables",
      locality: "Cite Blanc (Padco)",
      postalCode: "11102",
    },
    {
      city: "Pointe aux Sables",
      locality: "Le Printemps",
      postalCode: "11118",
    },
    { city: "Pointe aux Sables", locality: "U.T.M", postalCode: "11134" },
    {
      city: "Pointe aux Sables",
      locality: "Cite C.H.A/Cite Debarcadere",
      postalCode: "11103",
    },
    {
      city: "Pointe aux Sables",
      locality: "Le Vieux",
      postalCode: "11119",
    },
    {
      city: "Pointe aux Sables",
      locality: "Verger Mangue",
      postalCode: "11135",
    },
    {
      city: "Pointe aux Sables",
      locality: "Cite Ilois Phase I & Phase II",
      postalCode: "11104",
    },
    {
      city: "Pointe aux Sables",
      locality: "Nazroo Phase 1 & Phase 2",
      postalCode: "11120",
    },
    { city: "Quartier Militaire", locality: "Betuel", postalCode: "81101" },
    {
      city: "Quartier Militaire",
      locality: "Bonne Veine",
      postalCode: "81102",
    },
    {
      city: "Quartier Militaire",
      locality: "Cite Bonne Veine",
      postalCode: "81103",
    },
    {
      city: "Quartier Militaire",
      locality: "Cite Padco (A.Ravaton)",
      postalCode: "81104",
    },
    { city: "Quartier Militaire", locality: "New Road", postalCode: "81105" },
    {
      city: "Quartier Militaire",
      locality: "Quartier Militaire",
      postalCode: "81106",
    },
    { city: "Quartier Militaire", locality: "Vuillemin", postalCode: "81107" },
    { city: "Quatre Cocos", locality: "Belle Mare", postalCode: "41601" },
    { city: "Quatre Cocos", locality: "Camp Marcelin", postalCode: "41602" },
    { city: "Quatre Cocos", locality: "Camp Rannoo", postalCode: "41603" },
    { city: "Quatre Cocos", locality: "Palmar", postalCode: "41604" },
    { city: "Quatre Cocos", locality: "Quatre Cocos", postalCode: "41605" },
    { city: "Queen Victoria", locality: "Bonne Mere", postalCode: "42701" },
    {
      city: "Queen Victoria",
      locality: "Camp Bonne Mere",
      postalCode: "42702",
    },
    { city: "Queen Victoria", locality: "NHDC B Mere", postalCode: "42703" },
    { city: "Queen Victoria", locality: "Queen Victoria", postalCode: "42704" },
    {
      city: "Quatre Soeurs",
      locality: "Deux Freres Seaside",
      postalCode: "52702",
    },
    { city: "Quatre Soeurs", locality: "Marie Jeanne", postalCode: "52703" },
    { city: "Quatre Soeurs", locality: "Mr Joly", postalCode: "52704" },
    {
      city: "Quatre Soeurs",
      locality: "Pointe aux Feuilles",
      postalCode: "52705",
    },
    {
      city: "Quatre Soeurs",
      locality: "Deux Freres Mountain side",
      postalCode: "52701",
    },
    { city: "Roches Noires", locality: "Azuri Complex", postalCode: "31201" },
    { city: "Roches Noires", locality: "Coastal Side", postalCode: "31202" },
    {
      city: "Roches Noires",
      locality: "Domaine du levant",
      postalCode: "31203",
    },
    { city: "Roches Noires", locality: "Haute Rive", postalCode: "31204" },
    { city: "Roches Noires", locality: "Lambic", postalCode: "31205" },
    {
      city: "Roches Noires",
      locality: "Roches Noires Village",
      postalCode: "31206",
    },
    { city: "Roches Noires", locality: "Branch Rd", postalCode: "31207" },
    { city: "Roches Noires", locality: "Sidine", postalCode: "31208" },
    {
      city: "Richelieu",
      locality: "Royal Rd from Emmaus to Richelieu Branch Rd",
      postalCode: "71608",
    },
    { city: "Richelieu", locality: "Allee Tamarin", postalCode: "91301" },
    { city: "Richelieu", locality: "Cite Richelieu", postalCode: "91302" },
    { city: "Richelieu", locality: "Platform", postalCode: "91303" },
    { city: "Richelieu", locality: "Richelieu", postalCode: "91304" },
    {
      city: "Roche Terre",
      locality: "Roche Terre Street",
      postalCode: "11703",
    },
    { city: "Roche Terre", locality: "Calasse", postalCode: "32001" },
    { city: "Roche Terre", locality: "Roche Terre", postalCode: "32002" },
    { city: "Riviere du Poste", locality: "Camp Rabaud", postalCode: "60701" },
    { city: "Riviere du Poste", locality: "Camp Siajee", postalCode: "60702" },
    { city: "Riviere du Poste", locality: "Riv du Poste", postalCode: "60703" },
    {
      city: "Riviere du Poste",
      locality: "Terrain Maurice",
      postalCode: "60704",
    },
    {
      city: "Riviere des Anguilles",
      locality: "PRUD'HOMME",
      postalCode: "0603",
    },
    {
      city: "Riviere des Anguilles",
      locality: "MORC PRUD'HOMME",
      postalCode: "60604",
    },
    {
      city: "Riviere des Anguilles",
      locality: "MAISONNETTE",
      postalCode: "60605",
    },
    { city: "Riviere des Anguilles", locality: "RAILWAY", postalCode: "60606" },
    {
      city: "Riviere des Anguilles",
      locality: "RAILWAY SQUARE",
      postalCode: "61802",
    },
    {
      city: "Riviere des Anguilles",
      locality: "BARRACKS",
      postalCode: "60608",
    },
    {
      city: "Riviere des Anguilles",
      locality: "CAMP MARTIN",
      postalCode: "60609",
    },
    {
      city: "Riviere des Anguilles",
      locality: "LA VANILLE NHDC",
      postalCode: "60610",
    },
    {
      city: "Riviere des Anguilles",
      locality: "BEL AIR SAINT FELIX",
      postalCode: "60611",
    },
    {
      city: "Riviere des Anguilles",
      locality: "SENNEVILLE",
      postalCode: "60601",
    },
    {
      city: "Riviere des Anguilles",
      locality: "MORC ROUNTREE (land)",
      postalCode: "60602",
    },
    {
      city: "Riviere des Creoles",
      locality: "Camp Carol",
      postalCode: "51601",
    },
    { city: "Riviere des Creoles", locality: "Cite CHA", postalCode: "51602" },
    {
      city: "Riviere des Creoles",
      locality: "Cite Longtill",
      postalCode: "51603",
    },
    {
      city: "Riviere des Creoles",
      locality: "Morc. Ferney, VRS",
      postalCode: "51604",
    },
    {
      city: "Riviere des Creoles",
      locality: "Pte Brocus",
      postalCode: "51605",
    },
    {
      city: "Riviere des Creoles",
      locality: "Riviere des Creoles",
      postalCode: "51606",
    },
    { city: "Riviere du Rempart", locality: "P", postalCode: "31109" },
    {
      city: "Riviere du Rempart",
      locality: "Plaines des Roches Aubin",
      postalCode: "31901",
    },
    {
      city: "Riviere du Rempart",
      locality: "Pte des Lascars",
      postalCode: "31110",
    },
    {
      city: "Riviere du Rempart",
      locality: "Plaines des Roches (Lower)",
      postalCode: "31902",
    },
    {
      city: "Riviere du Rempart",
      locality: "Railway Lane",
      postalCode: "31111",
    },
    {
      city: "Riviere du Rempart",
      locality: "Plaines des Roches (Upper)",
      postalCode: "31903",
    },
    {
      city: "Riviere du Rempart",
      locality: "Railway Line",
      postalCode: "31112",
    },
    {
      city: "Riviere du Rempart",
      locality: "Plaines des Roches Seneck",
      postalCode: "31904",
    },
    { city: "Riviere du Rempart", locality: "Riverside", postalCode: "31113" },
    { city: "Riviere du Rempart", locality: "Amaury", postalCode: "31401" },
    {
      city: "Riviere du Rempart",
      locality: "Riviere du Rempart",
      postalCode: "31114",
    },
    {
      city: "Riviere du Rempart",
      locality: "Bois Jacquot",
      postalCode: "31402",
    },
    {
      city: "Riviere du Rempart",
      locality: "Schoenfield",
      postalCode: "31115",
    },
    {
      city: "Riviere du Rempart",
      locality: "Bois Mourand",
      postalCode: "31403",
    },
    { city: "Riviere du Rempart", locality: "Temple", postalCode: "31116" },
    {
      city: "Riviere du Rempart",
      locality: "Morc Beauclimat",
      postalCode: "31404",
    },
    { city: "Riviere du Rempart", locality: "Cite C.H.A", postalCode: "31101" },
    {
      city: "Riviere du Rempart",
      locality: "B.V.Maurel (Amitie) part of",
      postalCode: "30101",
    },
    { city: "Riviere du Rempart", locality: "Cite EDC", postalCode: "31102" },
    { city: "Riviere du Rempart", locality: "Antoinette", postalCode: "30102" },
    {
      city: "Riviere du Rempart",
      locality: "Coquinbourg",
      postalCode: "31103",
    },
    { city: "Riviere du Rempart", locality: "Barlow", postalCode: "30103" },
    { city: "Riviere du Rempart", locality: "Haute Rive", postalCode: "31104" },
    {
      city: "Riviere du Rempart",
      locality: "Belle Vue Maurel",
      postalCode: "30104",
    },
    {
      city: "Riviere du Rempart",
      locality: "La Clemence",
      postalCode: "31105",
    },
    { city: "Riviere du Rempart", locality: "Desjardins", postalCode: "30105" },
    { city: "Riviere du Rempart", locality: "Maurel", postalCode: "31106" },
    {
      city: "Riviere du Rempart",
      locality: "Mon. Allybocus",
      postalCode: "30106",
    },
    {
      city: "Riviere du Rempart",
      locality: "Mosque Lane",
      postalCode: "31107",
    },
    { city: "Riviere du Rempart", locality: "Mon Loisir", postalCode: "30107" },
    { city: "Riviere du Rempart", locality: "Panchvati", postalCode: "31108" },
    {
      city: "Riviere du Rempart",
      locality: "Phoolia Nagar",
      postalCode: "30108",
    },
    {
      city: "Rose Belle",
      locality: "Cite Balisson (SILWF)",
      postalCode: "52107",
    },
    { city: "Rose Belle", locality: "Morc Orchidee", postalCode: "51823" },
    { city: "Rose Belle", locality: "Cite EDC", postalCode: "51808" },
    { city: "Rose Belle", locality: "Morc Rosiere", postalCode: "51824" },
    { city: "Rose Belle", locality: "Cite Padco", postalCode: "52109" },
    { city: "Rose Belle", locality: "Morc S.I.T", postalCode: "51825" },
    { city: "Rose Belle", locality: "Gebert", postalCode: "51810" },
    { city: "Rose Belle", locality: "Mosque Rd", postalCode: "51826" },
    { city: "Rose Belle", locality: "Letord", postalCode: "51811" },
    { city: "Rose Belle", locality: "Railway", postalCode: "51827" },
    { city: "Rose Belle", locality: "Le Vieux Moulin", postalCode: "51812" },
    { city: "Rose Belle", locality: "Res Marc Chicose", postalCode: "51828" },
    { city: "Rose Belle", locality: "Madame Lolo", postalCode: "51813" },
    { city: "Rose Belle", locality: "Rose Belle", postalCode: "51829" },
    { city: "Rose Belle", locality: "Marie Jeannie", postalCode: "51814" },
    { city: "Rose Belle", locality: "Mongelard", postalCode: "51815" },
    { city: "Rose Belle", locality: "Mon Rose 1", postalCode: "51816" },
    { city: "Rose Belle", locality: "Balisson", postalCode: "52101" },
    { city: "Rose Belle", locality: "Mon Rose 2", postalCode: "51817" },
    { city: "Rose Belle", locality: "Baramia", postalCode: "51802" },
    { city: "Rose Belle", locality: "Morc Bakory", postalCode: "51818" },
    { city: "Rose Belle", locality: "Camp Bouvet", postalCode: "51803" },
    { city: "Rose Belle", locality: "Morc Boolaky", postalCode: "51819" },
    { city: "Rose Belle", locality: "Capitol", postalCode: "51804" },
    { city: "Rose Belle", locality: "Morc Brito", postalCode: "51820" },
    { city: "Rose Belle", locality: "Chakla", postalCode: "51805" },
    { city: "Rose Belle", locality: "Morc Domaine", postalCode: "51821" },
    { city: "Rose Belle", locality: "Chapel", postalCode: "51806" },
    { city: "Rose Belle", locality: "Morc Jac", postalCode: "51822" },
    { city: "Reduit", locality: "Martindale", postalCode: "80833" },
    {
      city: "Reduit",
      locality: "Mauritius Examination Syndicate",
      postalCode: "80834",
    },
    { city: "Reduit", locality: "Reduit", postalCode: "80835" },
    { city: "Reduit", locality: "State House", postalCode: "80836" },
    {
      city: "Reduit",
      locality: "University of Mauritius",
      postalCode: "80837",
    },
    { city: "Souillac", locality: "La Butte Region", postalCode: "11314" },
    { city: "Souillac", locality: "Ruisseau des Creoles", postalCode: "11323" },
    { city: "Souillac", locality: "Cite Gris Gris", postalCode: "60804" },
    { city: "Souillac", locality: "Cite Texamon", postalCode: "60805" },
    { city: "Souillac", locality: "Lady Barkly", postalCode: "60806" },
    { city: "Souillac", locality: "Morc Brise de Mer", postalCode: "60807" },
    { city: "Souillac", locality: "Morc Gris Gris", postalCode: "60808" },
    { city: "Souillac", locality: "NHDC Brise De Mer", postalCode: "60809" },
    { city: "Souillac", locality: "Souillac", postalCode: "60810" },
    { city: "Souillac", locality: "Terracine", postalCode: "60811" },
    { city: "Souillac", locality: "VRS 1 souillac", postalCode: "60812" },
    { city: "Souillac", locality: "VRS 2 souillac", postalCode: "60813" },
    { city: "Souillac", locality: "Cite Boodhoo", postalCode: "60801" },
    { city: "Souillac", locality: "Cite E.D.C Chaline", postalCode: "60802" },
    { city: "Souillac", locality: "Cite E.D.C Pitot", postalCode: "60803" },
    { city: "Souillac", locality: "Pont Souillac", postalCode: "80826" },
    { city: "St Hubert", locality: "Cent Gaulettes", postalCode: "51906" },
    { city: "St Hubert", locality: "Cite CHA", postalCode: "51907" },
    { city: "St Hubert", locality: "Cite St Hilaire", postalCode: "51908" },
    { city: "St Hubert", locality: "Hydro Power Station", postalCode: "51909" },
    { city: "St Hubert", locality: "Le Val Nature Park", postalCode: "51910" },
    { city: "St Hubert", locality: "Morc Dussoye", postalCode: "51911" },
    { city: "St Hubert", locality: "Morc Henry", postalCode: "51912" },
    { city: "St Hubert", locality: "Riche en Eau", postalCode: "51913" },
    { city: "St Hubert", locality: "St Hilaire", postalCode: "51914" },
    { city: "St Hubert", locality: "St Hubert", postalCode: "51915" },
    { city: "St Hubert", locality: "Ste Madeleine", postalCode: "51916" },
    { city: "St Hubert", locality: "Ste Philomene", postalCode: "51917" },
    { city: "St Hubert", locality: "Camp Jardin", postalCode: "51904" },
    { city: "St Hubert", locality: "Camp Ramphul", postalCode: "51905" },
    { city: "St Hubert", locality: "Beau Site", postalCode: "51901" },
    { city: "St Hubert", locality: "Camp Filbert", postalCode: "51902" },
    { city: "St Hubert", locality: "Camp Florine", postalCode: "51903" },
    {
      city: "Surinam",
      locality: "African Town squatters",
      postalCode: "60901",
    },
    { city: "Surinam", locality: "Saint Louis", postalCode: "60917" },
    { city: "Surinam", locality: "Balance", postalCode: "60902" },
    { city: "Surinam", locality: "Sept Croisees", postalCode: "60918" },
    { city: "Surinam", locality: "Trois Bras", postalCode: "60919" },
    { city: "Surinam", locality: "CEMETARY Squatters", postalCode: "60903" },
    {
      city: "Surinam",
      locality: "Cite de Dieu Squatters",
      postalCode: "60904",
    },
    { city: "Surinam", locality: "Cite EDC 1 Surinam", postalCode: "60905" },
    { city: "Surinam", locality: "Cite EDC 2 Surinam", postalCode: "60906" },
    { city: "Surinam", locality: "Coastal/mandir", postalCode: "60907" },
    { city: "Surinam", locality: "Katamaraz", postalCode: "60908" },
    { city: "Surinam", locality: "Martiniere", postalCode: "60909" },
    { city: "Surinam", locality: "Morc Dhunputh", postalCode: "60910" },
    { city: "Surinam", locality: "Morc DIDI", postalCode: "60911" },
    { city: "Surinam", locality: "Morc Gobin", postalCode: "60912" },
    { city: "Surinam", locality: "NHDC Filao", postalCode: "60913" },
    { city: "Surinam", locality: "Pomponette", postalCode: "60914" },
    { city: "Surinam", locality: "Riambel", postalCode: "60915" },
    { city: "Surinam", locality: "Rochester/Mosque", postalCode: "60916" },
    { city: "Sebastopol", locality: "Citadelle Region", postalCode: "11405" },
    { city: "Sebastopol", locality: "Cent Gaulettes", postalCode: "42101" },
    { city: "Sebastopol", locality: "Cite Sebastopol", postalCode: "42102" },
    { city: "Sebastopol", locality: "Clt", postalCode: "42103" },
    { city: "Sebastopol", locality: "Etoile", postalCode: "42104" },
    { city: "Sebastopol", locality: "Lesur", postalCode: "42105" },
    { city: "Sebastopol", locality: "Pellegrin", postalCode: "42106" },
    { city: "Sebastopol", locality: "Sebastopol", postalCode: "42107" },
    {
      city: "Saint Julien Village",
      locality: "Saint Julien Village",
      postalCode: "41901",
    },
    {
      city: "Saint Julien Village",
      locality: "Rich Fund",
      postalCode: "41902",
    },
    {
      city: "Saint Julien Village",
      locality: "Union Flacq",
      postalCode: "41903",
    },
    { city: "Saint Pierre", locality: "Petit Verger", postalCode: "81417" },
    { city: "Saint Pierre", locality: "Camp Auguste", postalCode: "81401" },
    { city: "Saint Pierre", locality: "Roselyn Cottage", postalCode: "81418" },
    { city: "Saint Pierre", locality: "Circonstance", postalCode: "81402" },
    { city: "Saint Pierre", locality: "Rte Bois Cheri", postalCode: "81419" },
    { city: "Saint Pierre", locality: "Cite Cote D'Or", postalCode: "81403" },
    {
      city: "Saint Pierre",
      locality: "SAINT PIERRE 114+162",
      postalCode: "81420",
    },
    { city: "Saint Pierre", locality: "Cote d'Or VRS 1", postalCode: "81404" },
    {
      city: "Saint Pierre",
      locality: "Sites and Services",
      postalCode: "81421",
    },
    { city: "Saint Pierre", locality: "Helvetia", postalCode: "81405" },
    {
      city: "Saint Pierre",
      locality: "Traffic Commercial centre",
      postalCode: "81422",
    },
    {
      city: "Saint Pierre",
      locality: "Industrial Zone-Old Post Office",
      postalCode: "81406",
    },
    { city: "Saint Pierre", locality: "VIGNOL NHDC", postalCode: "81423" },
    { city: "Saint Pierre", locality: "Kendra", postalCode: "81407" },
    { city: "Saint Pierre", locality: "L'Agrement", postalCode: "81408" },
    { city: "Saint Pierre", locality: "Mont Fleuri", postalCode: "81409" },
    {
      city: "Saint Pierre",
      locality: "Morc Frangipanne Phase 2",
      postalCode: "81410",
    },
    {
      city: "Saint Pierre",
      locality: "Morc Frangipanne Phase 3",
      postalCode: "81411",
    },
    {
      city: "Saint Pierre",
      locality: "Morc MDA circonstance",
      postalCode: "81412",
    },
    { city: "Saint Pierre", locality: "Morc Merrytown", postalCode: "81413" },
    { city: "Saint Pierre", locality: "Morc Raffray", postalCode: "81414" },
    {
      city: "Saint Pierre",
      locality: "Morc Traffic Centre",
      postalCode: "81415",
    },
    { city: "Saint Pierre", locality: "Morc VRS 1", postalCode: "81416" },
    { city: "Tyack", locality: "LOWER TYACK", postalCode: "61802" },
    { city: "Tyack", locality: "UPPER TYACK", postalCode: "61805" },
    { city: "Tyack", locality: "CITE TYACK", postalCode: "61801" },
    { city: "Tyack", locality: "MORC BLUE PRINT", postalCode: "61803" },
    { city: "Tyack", locality: "NHDC TYACK", postalCode: "61804" },
    { city: "Triolet", locality: "Cinema Casse", postalCode: "21501" },
    { city: "Triolet", locality: "Cite EDC", postalCode: "21502" },
    { city: "Triolet", locality: "Huitieme Mile", postalCode: "21503" },
    { city: "Triolet", locality: "Neuvieme Mile", postalCode: "21504" },
    { city: "Triolet", locality: "NHDC (Solitude)", postalCode: "21505" },
    { city: "Triolet", locality: "Septieme Mile", postalCode: "21506" },
    { city: "Triolet", locality: "Solitude", postalCode: "21507" },
    { city: "Triolet", locality: "Terminus", postalCode: "21508" },
    { city: "Triolet", locality: "Trois Boutiques", postalCode: "21509" },
    { city: "Tamarin", locality: "Allee Tamarin", postalCode: "R4103" },
    { city: "Tamarin", locality: "Morc Salt Pan", postalCode: "90916" },
    { city: "Tamarin", locality: "Barachois", postalCode: "90901" },
    { city: "Tamarin", locality: "Morc. La Falaise", postalCode: "90917" },
    { city: "Tamarin", locality: "Cap Dal", postalCode: "90902" },
    { city: "Tamarin", locality: "Morc. St. Benoit", postalCode: "90918" },
    { city: "Tamarin", locality: "Cite EDC", postalCode: "90903" },
    { city: "Tamarin", locality: "Morc. Verojan", postalCode: "90919" },
    { city: "Tamarin", locality: "Cite Padco", postalCode: "90904" },
    { city: "Tamarin", locality: "NHDC", postalCode: "90920" },
    { city: "Tamarin", locality: "Domaine Mont Calme", postalCode: "90905" },
    { city: "Tamarin", locality: "Tamarin", postalCode: "90921" },
    { city: "Tamarin", locality: "La Mivoie", postalCode: "90906" },
    { city: "Tamarin", locality: "Tamarin Golf", postalCode: "90922" },
    { city: "Tombeau Bay", locality: "Morc Senestra", postalCode: "21724" },
    { city: "Tombeau Bay", locality: "Morc Swan", postalCode: "21725" },
    { city: "Tombeau Bay", locality: "Morc Zenith", postalCode: "21726" },
    { city: "Trou aux Biches", locality: "Morc Ramdhany", postalCode: "22313" },
    {
      city: "Trou aux Biches",
      locality: "Morc Residence",
      postalCode: "22314",
    },
    { city: "Triolet", locality: "Cinema Casse", postalCode: "21501" },
    { city: "Triolet", locality: "Cite EDC", postalCode: "21502" },
    { city: "Triolet", locality: "Huitieme Mile", postalCode: "21503" },
    { city: "Triolet", locality: "Neuvieme Mile", postalCode: "21504" },
    { city: "Triolet", locality: "NHDC (Solitude)", postalCode: "21505" },
    { city: "Triolet", locality: "Septieme Mile", postalCode: "21506" },
    { city: "Triolet", locality: "Solitude", postalCode: "21507" },
    { city: "Triolet", locality: "Terminus", postalCode: "21508" },
    { city: "Triolet", locality: "Trois Boutiques", postalCode: "21509" },
    { city: "Tamarin", locality: "STANLEY 2", postalCode: "71171" },
    { city: "Tamarin", locality: "CAMP LEVIEUX 1", postalCode: "71203" },
    { city: "Tamarin", locality: "Roche Bois 2", postalCode: "11703" },
    { city: "Tamarin", locality: "Allee Tamarin", postalCode: "R4103" },
    { city: "Tamarin", locality: "Tamarin", postalCode: "R2519" },
    { city: "Tamarin", locality: "Morc Salt Pan", postalCode: "90916" },
    { city: "Tamarin", locality: "Barachois", postalCode: "90901" },
    { city: "Tamarin", locality: "Morc. La Falaise", postalCode: "90917" },
    { city: "Tamarin", locality: "Cap Dal", postalCode: "90902" },
    { city: "Tamarin", locality: "Morc. St. Benoit", postalCode: "90918" },
    { city: "Tamarin", locality: "Cite EDC", postalCode: "90903" },
    { city: "Tamarin", locality: "Morc. Verojan", postalCode: "90919" },
    { city: "Tamarin", locality: "Cite Padco", postalCode: "90904" },
    { city: "Tamarin", locality: "NHDC", postalCode: "90920" },
    { city: "Tamarin", locality: "Domaine Mont Calme", postalCode: "90905" },
    { city: "Tamarin", locality: "Tamarin", postalCode: "90921" },
    { city: "Tamarin", locality: "La Mivoie", postalCode: "90906" },
    { city: "Tamarin", locality: "Tamarin Golf", postalCode: "90922" },
    { city: "Tamarin", locality: "La Tourelle", postalCode: "90907" },
    { city: "Tamarin", locality: "Morc Black Rock", postalCode: "90908" },
    { city: "Tamarin", locality: "Morc. Mont Calme", postalCode: "90909" },
    { city: "Tamarin", locality: "Morc Carlos", postalCode: "90910" },
    { city: "Tamarin", locality: "Morc Corail", postalCode: "90911" },
    { city: "Tamarin", locality: "Morc Investors", postalCode: "90912" },
    { city: "Tamarin", locality: "Morc Le Domain", postalCode: "90913" },
    { city: "Tamarin", locality: "Morc Les Alizees", postalCode: "90914" },
    { city: "Tamarin", locality: "Morc Les Salines", postalCode: "90915" },
    { city: "Tamarin", locality: "Allee Tamarin", postalCode: "91301" },
    { city: "Tamarin", locality: "Allee Tamarin", postalCode: "90101" },
    { city: "Tamarin", locality: "Cite Tamarinier", postalCode: "90604" },
    { city: "Tombeau Bay", locality: "Morc Senestra", postalCode: "21724" },
    { city: "Tombeau Bay", locality: "Morc Swan", postalCode: "21725" },
    { city: "Tombeau Bay", locality: "Morc Zenith", postalCode: "21726" },
    { city: "Tombeau Bay", locality: "N.H.D.C", postalCode: "21727" },
    { city: "Tombeau Bay", locality: "Paille en Queue", postalCode: "21728" },
    { city: "Tombeau Bay", locality: "Pont Bruniquel", postalCode: "21729" },
    { city: "Tombeau Bay", locality: "Residence St Malo", postalCode: "21730" },
    { city: "Tombeau Bay", locality: "Riche Terre", postalCode: "21731" },
    { city: "Tombeau Bay", locality: "St Malo", postalCode: "21732" },
    {
      city: "Tombeau Bay",
      locality: "Tombeau Bay (Royal Rd)",
      postalCode: "21733",
    },
    { city: "Tombeau Bay", locality: "Tresor", postalCode: "21734" },
    {
      city: "Tombeau Bay",
      locality: "Village les cocotiers",
      postalCode: "21735",
    },
    { city: "Tombeau Bay", locality: "Morc Mignot", postalCode: "21721" },
    { city: "Tombeau Bay", locality: "Morc Rouillard", postalCode: "21722" },
    { city: "Tombeau Bay", locality: "Morc Ruhomatally", postalCode: "21723" },
    { city: "Tombeau Bay", locality: "Industrial Zone", postalCode: "21708" },
    {
      city: "Tombeau Bay",
      locality: "Le Goulet (Royal Rd)",
      postalCode: "21709",
    },
    { city: "Tombeau Bay", locality: "Morc Beau Rivage", postalCode: "21710" },
    { city: "Tombeau Bay", locality: "Morc Boucan", postalCode: "21711" },
    { city: "Tombeau Bay", locality: "Morc Concorde", postalCode: "21712" },
    { city: "Tombeau Bay", locality: "Morc Coprim", postalCode: "21713" },
    { city: "Tombeau Bay", locality: "Morc Dassagne", postalCode: "21714" },
    { city: "Tombeau Bay", locality: "Morc Filature", postalCode: "21715" },
    { city: "Tombeau Bay", locality: "Morc Fong Sing", postalCode: "21716" },
    { city: "Tombeau Bay", locality: "Auberge", postalCode: "21701" },
    { city: "Tombeau Bay", locality: "Morc Illois", postalCode: "21717" },
    { city: "Tombeau Bay", locality: "Bay Village", postalCode: "21702" },
    { city: "Tombeau Bay", locality: "Morc La Cocheyle", postalCode: "21718" },
    { city: "Tombeau Bay", locality: "Cite Florida", postalCode: "21703" },
    { city: "Tombeau Bay", locality: "Morc Le Verger", postalCode: "21719" },
    { city: "Tombeau Bay", locality: "Cite Illois", postalCode: "21704" },
    { city: "Tombeau Bay", locality: "Morc Madhoo", postalCode: "21720" },
    {
      city: "Tombeau Bay",
      locality: "Cite La Chaux/State Land",
      postalCode: "21705",
    },
    { city: "Tombeau Bay", locality: "Docker's land", postalCode: "21706" },
    { city: "Tombeau Bay", locality: "Elizabethville", postalCode: "21707" },
    { city: "Trou aux Biches", locality: "Morc Ramdhany", postalCode: "22313" },
    {
      city: "Trou aux Biches",
      locality: "Morc Residence",
      postalCode: "22314",
    },
    {
      city: "Trou aux Biches",
      locality: "Morc Sagitaire",
      postalCode: "22315",
    },
    { city: "Trou aux Biches", locality: "Morc Souvenir", postalCode: "22316" },
    {
      city: "Trou aux Biches",
      locality: "Cite EDC Pere Laval",
      postalCode: "22301",
    },
    { city: "Trou aux Biches", locality: "Morc Tobago", postalCode: "22317" },
    { city: "Trou aux Biches", locality: "Morc Asviva", postalCode: "22302" },
    { city: "Trou aux Biches", locality: "Morc Trio", postalCode: "22318" },
    { city: "Trou aux Biches", locality: "Morc Bassa", postalCode: "22303" },
    {
      city: "Trou aux Biches",
      locality: "Morc VRS Choisy",
      postalCode: "22319",
    },
    { city: "Trou aux Biches", locality: "Morc Choisy", postalCode: "22304" },
    {
      city: "Trou aux Biches",
      locality: "Residence Le Flibustier",
      postalCode: "22320",
    },
    { city: "Trou aux Biches", locality: "Morc Elaya", postalCode: "22305" },
    {
      city: "Trou aux Biches",
      locality: "Trou aux Biches I",
      postalCode: "22321",
    },
    { city: "Trou aux Biches", locality: "Morc Future", postalCode: "22306" },
    {
      city: "Trou aux Biches",
      locality: "Trou aux Biches II",
      postalCode: "22322",
    },
    { city: "Trou aux Biches", locality: "Morc Hossen", postalCode: "22307" },
    { city: "Trou aux Biches", locality: "Morc Jhuboo", postalCode: "22308" },
    {
      city: "Trou aux Biches",
      locality: "Morc Mascareign",
      postalCode: "22309",
    },
    { city: "Trou aux Biches", locality: "Morc Moosary", postalCode: "22310" },
    { city: "Trou aux Biches", locality: "Morc Papin", postalCode: "22311" },
    { city: "Trou aux Biches", locality: "Morc Ramdewar", postalCode: "22312" },
    { city: "The Vale", locality: "Lower Vale", postalCode: "31301" },
    { city: "The Vale", locality: "Upper Vale", postalCode: "31302" },
    {
      city: "Trois Boutiques",
      locality: "Morc. Les Palmiers",
      postalCode: "52008",
    },
    { city: "Trois Boutiques", locality: "Morc Pitchen", postalCode: "52009" },
    { city: "Trois Boutiques", locality: "Plein Bois", postalCode: "52010" },
    {
      city: "Trois Boutiques",
      locality: "Trois Boutiques",
      postalCode: "52011",
    },
    { city: "Trois Boutiques", locality: "Union Vale", postalCode: "52012" },
    { city: "Trois Boutiques", locality: "Virginia", postalCode: "52013" },
    { city: "Trois Boutiques", locality: "Beau Fonds", postalCode: "52001" },
    {
      city: "Trois Boutiques",
      locality: "Carreau Esnouf",
      postalCode: "52002",
    },
    {
      city: "Trois Boutiques",
      locality: "Carreau La Paille",
      postalCode: "52003",
    },
    { city: "Trois Boutiques", locality: "Cite Ouvrière", postalCode: "52004" },
    {
      city: "Trois Boutiques",
      locality: "Cite Trois Boutiques",
      postalCode: "52005",
    },
    { city: "Trois Boutiques", locality: "Malakoff", postalCode: "52006" },
    {
      city: "Trois Boutiques",
      locality: "Morc. Aspirale",
      postalCode: "52007",
    },
    {
      city: "Trois Boutiques",
      locality: "Trois Boutiques",
      postalCode: "21509",
    },
    {
      city: "Terre Rouge",
      locality:
        "St Croix 2 - Pamplemousses Street (Eastern Side) from latanier River to Ruisseau Terre Rouge",
      postalCode: "11705",
    },
    {
      city: "Terre Rouge",
      locality:
        "St Croix 2 - Terre Rouge River from Terre Rouge River to Impasse Canal",
      postalCode: "11705",
    },
    {
      city: "Terre Rouge",
      locality: "St Croix 3 - Terre Rouge River",
      postalCode: "11706",
    },
    {
      city: "Terre Rouge",
      locality:
        "Roche Bois 2 - Eastern Side of Mohameddan Cemetery from Mariamen Temple to Ruisseau Terre Rouge",
      postalCode: "11703",
    },
    {
      city: "Terre Rouge",
      locality:
        "Roche Bois 2 - Ruisseau Terre Rouge from Trunk Road to Mohameddan Cemetery",
      postalCode: "11703",
    },
    {
      city: "Terre Rouge",
      locality:
        "Roche Bois 2 - Trunk Road Eastern Side from latanier River to Ruisseau Terre Rouge",
      postalCode: "11703",
    },
    {
      city: "Terre Rouge",
      locality:
        "St Croix 2 -  Pere Laval from Terre Rouge Road to Canal Bathurst",
      postalCode: "11705",
    },
    {
      city: "Terre Rouge",
      locality: "Roche Bois 1 - Terre Rouge River from Trunk Road to the sea",
      postalCode: "11614",
    },
    {
      city: "Terre Rouge",
      locality:
        "Roche Bois 1 - Trunk Road Western Side from Latanier River to Ruisseau Terre Rouge",
      postalCode: "11614",
    },
    {
      city: "Terre Rouge",
      locality:
        "Briquetterie - Port Louis Terre Rouge Road from Round About to Riviere Terre Rouge",
      postalCode: "11701",
    },
    { city: "Terre Rouge", locality: "Terre Rouge", postalCode: "R5130" },
    { city: "Terre Rouge", locality: "Morc. Green Park", postalCode: "21409" },
    { city: "Terre Rouge", locality: "Morc Peerun", postalCode: "21410" },
    { city: "Terre Rouge", locality: "Morc.Poonith", postalCode: "21411" },
    { city: "Terre Rouge", locality: "Morc. Ragoobar", postalCode: "21412" },
    { city: "Terre Rouge", locality: "Morc Soobratty", postalCode: "21413" },
    { city: "Terre Rouge", locality: "Morc. Tara", postalCode: "21414" },
    { city: "Terre Rouge", locality: "St Joseph", postalCode: "21415" },
    { city: "Terre Rouge", locality: "Terre Rouge", postalCode: "21416" },
    { city: "Terre Rouge", locality: "Bois Marchand", postalCode: "21401" },
    { city: "Terre Rouge", locality: "Bois Pignolet", postalCode: "21402" },
    { city: "Terre Rouge", locality: "Camp La Boue", postalCode: "21403" },
    { city: "Terre Rouge", locality: "C.E.B Sq.", postalCode: "21404" },
    {
      city: "Terre Rouge",
      locality: "Cite Bois Marchand",
      postalCode: "21405",
    },
    { city: "Terre Rouge", locality: "Mamzelle Laure", postalCode: "21406" },
    { city: "Terre Rouge", locality: "Morc Bussawon", postalCode: "21407" },
    { city: "Terre Rouge", locality: "Morc. Cathan", postalCode: "21408" },
    {
      city: "Terre Rouge",
      locality: "Terre Rouge (village)",
      postalCode: "21815",
    },
    {
      city: "Union Ducray / St Aubin",
      locality: "Union Ducray S.E/Union St Aubin",
      postalCode: "61501",
    },
    {
      city: "Union Ducray / St Aubin",
      locality: "Cite Saint Aubin",
      postalCode: "61502",
    },
    {
      city: "Union Ducray / St Aubin",
      locality: "Morc St Aubin",
      postalCode: "61503",
    },
    {
      city: "Union Ducray / St Aubin",
      locality: "New morc St Aubin (land only)",
      postalCode: "61504",
    },
    { city: "Union Park", locality: "Cluny rd", postalCode: "52104" },
    { city: "Union Park", locality: "Morc Cheminee", postalCode: "52105" },
    { city: "Union Park", locality: "Morc VRS", postalCode: "52106" },
    { city: "Union Park", locality: "School Rd", postalCode: "52107" },
    { city: "Union Park", locality: "U.Park", postalCode: "52108" },
    { city: "Ville Bague", locality: "Camp Sipaye", postalCode: "21601" },
    { city: "Ville Bague", locality: "Mon Songe", postalCode: "21602" },
    { city: "Ville Bague", locality: "Monc V.R.S", postalCode: "21603" },
    { city: "Ville Bague", locality: "Nicoliere", postalCode: "21604" },
    { city: "Ville Bague", locality: "Petite Julie", postalCode: "21605" },
    { city: "Ville Bague", locality: "Ville Bague upper", postalCode: "21606" },
    { city: "Ville Bague", locality: "Ville Bague lower", postalCode: "21607" },
    { city: "Verdun", locality: "Alma", postalCode: "81801" },
    { city: "Verdun", locality: "Cite EDC Verdun", postalCode: "81802" },
    { city: "Verdun", locality: "Verdun", postalCode: "81803" },
    { city: "Vacoas / Floreal", locality: "Riverwalk", postalCode: "73441" },
    { city: "Vacoas / Floreal", locality: "Vingta No. 2", postalCode: "73357" },
    { city: "Vacoas / Floreal", locality: "Sadally", postalCode: "73242" },
    { city: "Vacoas / Floreal", locality: "Vingta No. 3", postalCode: "73358" },
    { city: "Vacoas / Floreal", locality: "SMF QTRS", postalCode: "73443" },
    { city: "Vacoas / Floreal", locality: "Visitation", postalCode: "73359" },
    {
      city: "Vacoas / Floreal",
      locality: "Solferino No. 1",
      postalCode: "73344",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Solferino No. 2",
      postalCode: "73345",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Solferino No. 3",
      postalCode: "73346",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Morc Fleuriot",
      postalCode: "73431",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Solferino No. 4",
      postalCode: "73347",
    },
    { city: "Vacoas / Floreal", locality: "Morc Medine", postalCode: "73132" },
    {
      city: "Vacoas / Floreal",
      locality: "Solferino No. 5",
      postalCode: "73348",
    },
    { city: "Vacoas / Floreal", locality: "Morc Munbodh", postalCode: "73233" },
    { city: "Vacoas / Floreal", locality: "St Paul", postalCode: "73449" },
    { city: "Vacoas / Floreal", locality: "Morc Peerun", postalCode: "73234" },
    { city: "Vacoas / Floreal", locality: "Thompson", postalCode: "73250" },
    { city: "Vacoas / Floreal", locality: "Morc Pousson", postalCode: "73135" },
    {
      city: "Vacoas / Floreal",
      locality: "Trait d’Union",
      postalCode: "73451",
    },
    { city: "Vacoas / Floreal", locality: "Morc Sauba", postalCode: "73436" },
    {
      city: "Vacoas / Floreal",
      locality: "Tres Bon No. 1",
      postalCode: "73252",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Morc Seetaram",
      postalCode: "73137",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Tres Bon No. 2",
      postalCode: "73253",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Quinze Cantons No.1",
      postalCode: "73238",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Tres Bon No. 3",
      postalCode: "73254",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Quinze Cantons No.2",
      postalCode: "73239",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Tres Bon No. 4",
      postalCode: "73255",
    },
    { city: "Vacoas / Floreal", locality: "Reunion", postalCode: "73240" },
    { city: "Vacoas / Floreal", locality: "Vingta No. 1", postalCode: "73356" },
    {
      city: "Vacoas / Floreal",
      locality: "Cite Mangalkhan",
      postalCode: "74105",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Cite Henriette",
      postalCode: "73109",
    },
    {
      city: "Vacoas / Floreal",
      locality: "La Crne No.2",
      postalCode: "73325",
    },
    {
      city: "Vacoas / Floreal",
      locality: "De Burg Edwards",
      postalCode: "74106",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Cite La Crne",
      postalCode: "73310",
    },
    { city: "Vacoas / Floreal", locality: "La Marie", postalCode: "73126" },
    { city: "Vacoas / Floreal", locality: "John Kennedy", postalCode: "74107" },
    {
      city: "Vacoas / Floreal",
      locality: "Clairfonds No.1",
      postalCode: "73411",
    },
    { city: "Vacoas / Floreal", locality: "La Vanille", postalCode: "73227" },
    {
      city: "Vacoas / Floreal",
      locality: "King George V",
      postalCode: "74108",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Clairfonds No.2",
      postalCode: "73412",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Ligne Berthaud",
      postalCode: "73328",
    },
    { city: "Vacoas / Floreal", locality: "Morc GIDC", postalCode: "74109" },
    {
      city: "Vacoas / Floreal",
      locality: "Clairfonds No.3",
      postalCode: "73413",
    },
    { city: "Vacoas / Floreal", locality: "Modern", postalCode: "73329" },
    { city: "Vacoas / Floreal", locality: "Queen Mary", postalCode: "74110" },
    { city: "Vacoas / Floreal", locality: "Diolle", postalCode: "73114" },
    { city: "Vacoas / Floreal", locality: "Mon Desir", postalCode: "73330" },
    {
      city: "Vacoas / Floreal",
      locality: "Riviere Seche",
      postalCode: "74111",
    },
    { city: "Vacoas / Floreal", locality: "Simonet", postalCode: "74112" },
    {
      city: "Vacoas / Floreal",
      locality: "Allee Brillant",
      postalCode: "73401",
    },
    { city: "Vacoas / Floreal", locality: "E.Anquetil", postalCode: "73215" },
    { city: "Vacoas / Floreal", locality: "Glen Park", postalCode: "73116" },
    {
      city: "Vacoas / Floreal",
      locality: "Clairfonds No.1",
      postalCode: "73411",
    },
    {
      city: "Vacoas / Floreal",
      locality: "Allee Brillant",
      postalCode: "74101",
    },
    { city: "Vacoas / Floreal", locality: "Berthaud", postalCode: "74102" },
    { city: "Vacoas / Floreal", locality: "Cite EDC", postalCode: "74103" },
    { city: "Vacoas / Floreal", locality: "Cite Loiseau", postalCode: "74104" },
    {
      city: "Vacoas / Floreal",
      locality: "Carreau Lalianne",
      postalCode: "73108",
    },
    {
      city: "Vacoas / Floreal",
      locality: "La Crne No.1",
      postalCode: "73324",
    },
    { city: "Agalega", locality: "Village Vingt-Cinq", postalCode: "A1103" },
    { city: "Agalega", locality: "Ste Rita Village", postalCode: "A2101" },
    { city: "Agalega", locality: "La Fourche", postalCode: "A1101" },
    { city: "Agalega", locality: "OIDC (office)", postalCode: "A1102" },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Plaine Cite Patate",
      postalCode: "R1515",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Anse Baleine",
      postalCode: "R2501",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Plaine Corail",
      postalCode: "R1516",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Anse Quitor (Corail)",
      postalCode: "R1502",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Riviere Coco",
      postalCode: "R2517",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Anse Raffin",
      postalCode: "R2503",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "SONGES",
      postalCode: "R3518",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Bengelique/St Marie",
      postalCode: "R1504",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Tamarin",
      postalCode: "R2519",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Cascade Jean Louis*",
      postalCode: "R1505",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Cite Patate",
      postalCode: "R1506",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Corail Petite Butte",
      postalCode: "R1507",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Corail Vangassaille",
      postalCode: "R1508",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Grand La Fouche Corail*",
      postalCode: "R1509",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Grande Var",
      postalCode: "R2510",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Ile Michel",
      postalCode: "R2511",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Parc Tortue",
      postalCode: "R3512",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Petite Butte",
      postalCode: "R2513",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Petite Butte",
      postalCode: "R1513",
    },
    {
      city: "Rodrigues - Riviere Coco",
      locality: "Plaine Coco",
      postalCode: "R1514",
    },
    {
      city: "Montagne Blanche",
      locality: "Cite Saint Joseph",
      postalCode: "80901",
    },
    {
      city: "Montagne Blanche",
      locality: "Montagne Blanche",
      postalCode: "80902",
    },
    {
      city: "Montagne Blanche",
      locality: "Morc Sans Souci",
      postalCode: "80903",
    },
    { city: "Montagne Blanche", locality: "Petit Paquet", postalCode: "80905" },
    { city: "Montagne Blanche", locality: "Sans Souci", postalCode: "80906" },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Campeches Street",
      postalCode: "1708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Bernandin de St Pierre Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Croisee Vallee Des Pretes",
      postalCode: "11804",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Zaynah",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Captain Pontre Lane",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Capeyron Henri Andre Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Crownland Robert Scott",
      postalCode: "11805",
    },
    {
      city: "Port Louis",
      locality: "Ameermeeah",
      postalCode: "11810",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Capitaine Pontre Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Colophane Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Doomun lane",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "La Cure Bus Terminus",
      postalCode: "11806",
    },
    {
      city: "Port Louis",
      locality: "Mohamedally",
      postalCode: "11811",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - St Croix Road",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Eastern Side of Mayflower",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - F.H Decaille Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Agnis / Ramlagun (Lower V.D Pretes)",
      postalCode: "11807",
    },
    {
      city: "Port Louis",
      locality: "Pitchen",
      postalCode: "11812",
    },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Bassin Road",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Eucalyptus Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - James Canonville Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Ally / Sekdaur (Lower V.D Pretes)",
      postalCode: "11808",
    },
    { city: "Port Louis", locality: "NHDC Cite La Cure", postalCode: "11813" },
    {
      city: "Port Louis",
      locality: "St Croix 4 - CHA Le Cornu",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Gabriel Bouic Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Jules Chavin Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Al Madina ",
      postalCode: "11809",
    },
    { city: "Port Louis", locality: "NHDC (La Cure)", postalCode: "11814" },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Charles Beguinot Street",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Jamblon Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Jules Coup Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Autruches Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "NHDC (Les Cocotiers)",
      postalCode: "11815",
    },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Emile Basset Street",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Naushad Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Kalimaye Lane",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina -  des Dodos",
      postalCode: "11809",
    },
    { city: "Port Louis", locality: "NHDC (Media)", postalCode: "11816" },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Le Cornu Street",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Palissandre Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Lima Lane",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina -  des Rosiers",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Lower Valle Des Pretes - Jean Francois Street",
      postalCode: "11817",
    },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Mamode Hossen Ellam Street",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Privette Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Lome Lane",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Colombes Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Lower Valle Des Pretes - Paul et Virginie Street",
      postalCode: "11817",
    },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Pieton Pere Laval 2",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Quatre Epices Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Oslo Lane",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Faucon Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Lower Valle Des Pretes - School Lane",
      postalCode: "11817",
    },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Rev Pere Rivault Street",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality:
        "St Croix 5 - St Marie Road North from St Croix Road to La Cure",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Ramsarran Lane",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Glaieuls Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Lower Valle Des Pretes - Swadesh Street",
      postalCode: "11817",
    },
    {
      city: "Port Louis",
      locality: "St Croix 4 - Richard Miles Brown Street",
      postalCode: "11707",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - St Marie Street II",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Rosiers ",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Jasmin ",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Upper Vallee Des Pretes - Chitrakoot",
      postalCode: "11818",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - A.L Boulle Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Tatamaka Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Solitaire Street",
      postalCode: "11801",
    },
    {
      city: "Port Louis",
      locality: "Almadina - Laetita",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Upper Vallee Des Pretes - Valmicki Rd",
      postalCode: "11818",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Acajou Street (Star)",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Afique Lane",
      postalCode: "11801",
    },
    { city: "Port Louis", locality: "Cite CHA", postalCode: "11802" },
    {
      city: "Port Louis",
      locality: "Almadina - Pelican Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Bois de Natte Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Amasaki Lane",
      postalCode: "11801",
    },
    { city: "Port Louis", locality: "Cite La Cure", postalCode: "11803" },
    {
      city: "Port Louis",
      locality: "Almadina - Solitaire Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Upper Vallee Des Pretes - Valmicki Rd",
      postalCode: "11818",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Acajou Street (Star)",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Afique Lane",
      postalCode: "11801",
    },
    { city: "Port Louis", locality: "Cite CHA", postalCode: "11802" },
    {
      city: "Port Louis",
      locality: "Almadina - Pelican Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "St Croix 5 - Bois de Natte Street",
      postalCode: "11708",
    },
    {
      city: "Port Louis",
      locality: "Carreau Lalo - Amasaki Lane",
      postalCode: "11801",
    },
    { city: "Port Louis", locality: "Cite La Cure", postalCode: "11803" },
    {
      city: "Port Louis",
      locality: "Almadina - Solitaire Street",
      postalCode: "11809",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Koenig Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Roche Terre Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "St Croix 1 - Pamplemousses Road from Latanier River to Round About",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Canal Bathurst",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality:
        "St Croix 3 - St Marie Street from Canal Bathurst to St Croix Road",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Desboucher Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Latanier River from Nicolay Road to Trunk Road",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 2 - Ruisseau Terre Rouge from Trunk Road to Mohameddan Cemetery",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Peros Banos Street",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - W. Sophie Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Terre Rouge River",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Descarrieres Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Latanier Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Shand Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Tromelin Street",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - A. Leung Pew Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Despierres Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Lavaud Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - St Famille Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 -  Pere Laval",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Arpenteur Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Desroses Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Leonce Allas Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - St Martin Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Champ Ville Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - B. Brette Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Dupont Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Lesur Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Talipot Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Coteau Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Capucine Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Eastern Side of Mohameddan Cemetery",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Lobster Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Tamarind Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Desrose Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - CHA Mamzelle",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Flamboyant Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Mariamen Temple Road",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Trunk Road Eastern Side",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Dr. S. Ramgoolam Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Higginson Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Fortune Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Maurice Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Whales Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - La Prairie Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Isidore Bougnet Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Guillot Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Octopus Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Capitaine Street",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality:
        "St Croix 2 - Latanier River from Pamplemousses Street to off Pieton Pere Laval",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Louis Bandot Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Hon. Felix Barbe Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Palmier Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Dagorne Street",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Latanier Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Mamzelle Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Impasse Cimetiere",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Pamma Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Ducray Street",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - L'oiseau Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - New St Marie Street",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Impasse Cocoterie",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Pellegrin Street (1)",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Impasse Nicolay",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Pamplemousses Street (Eastern Side)",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Northern Side Pieton Pere Laval",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - John Brodie Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Pellegrin Street (2)",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Latanier Lane",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Pieton Pere Laval Southern Part",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - Pere Laval Road",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Julius Bonchera Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Pipou Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Latanier River from Route des Palplemousses",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Sophie Street",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - St Croix Church",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Kamaya Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Reverand Robert Giraud Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "St Croix 1 - Mariamen Temple",
      postalCode: "11704",
    },
    {
      city: "Port Louis",
      locality: "St Croix 2 - Terre Rouge River",
      postalCode: "11705",
    },
    {
      city: "Port Louis",
      locality: "St Croix 3 - St Croix Road",
      postalCode: "11706",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Peer Jamal Shah Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Maharata Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Renganaden Seeneevassen - S.S. Ramgoolam St",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Souchon Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Dr. Maurice Cure Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Paul Toureau Region - Mandarin Street",
      postalCode: "11702",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Constance Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Aleppo St from Noor-E-Islam St to Little Bridge",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Military Road from St Francois Xavier St to Noor-E-Islam",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Renganaden Seeneevassen - Sir Edgar Laurent St from SSR St to Mariamen Temple Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Terre Rouge River from Trunk Road to the sea",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Eagle Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality:
        "Paul Toureau Region - Pamplemousses Road from Canal Anglais to Ruisseau Latanier Western Side",
      postalCode: "11702",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Benares St from St Francois Xavier to Maharatta",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Paliaca St from Noor-E-Islam St to Maharatta",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Renganaden Seeneevassen - Sun Yat Sen St from SSR St Trunk Road",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 1 - Trunk Road Western Side from Latanier River to Ruisseau Terre Rouge",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality:
        "Briquetterie - Eastern Side of Mohameddan Cemetery Road from Mariamen Temple Road",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Paul Toureau Region - Paul Toureau Street",
      postalCode: "11702",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Bombay St from St Francois Xavier St to Leonce L`Oiseau Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Penang Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 1 - Abattoir Rd from Trunk Rd to Baie Du Tombeau Rd",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Victor Albert Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Fregate Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 2 - Abattoir Road from Latanier River to Trunk Road",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Borneo Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Perimbe St from St Francois Xavier to Noor-E-Islam Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Arrignet Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Vaudagne Steet",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - La Perle Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Adelaide Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Calcutta St From St Francois Xavier St to Little Bridge",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Serang Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 1 - Baie Du Tombeau Rd From Round About to Pont Bruniquel",
      postalCode: "11614",
    },
    { city: "Port Louis", locality: "Quay D", postalCode: "11615" },
    {
      city: "Port Louis",
      locality: "Briquetterie - Lavocaire Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Alfred Bernard Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Calicut St from Noor-E-Islam St to Maharatta Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Soumantra Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Balisage Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Abercrombie ",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality:
        "Briquetterie - Mariamen Temple Street Northern Side from Mohamedan Cemetery to Round About",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 2 - Balisage Road from Trunk Road to Batterie Casse Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Eastern Side of Noor-E-Islam Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Velore St from St Francois Xavier St to Noor-E-Islam Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - C Suzor Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Abercrombie CHA",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Paul Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Barry Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Madras St from St Francois Xavier St to A.R Mohamed Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Goa Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Western Side of St Francois Xavier Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Cemetery Rd",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Bois Dorée Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality:
        "Briquetterie - Port Louis Terre Rouge Road from Round About to Riviere Terre Rouge",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Batterie Cassé CHA",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Magon St from St Francois Xavier St to A.R Mohamed Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Ignapatnam",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Renganaden Seeneevassen - Ellacin Street (Ex Barbeau St) From S.S. Ramgoolam St Trunk Road",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - De Candray",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Bois Savon Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Raphael Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Baxipea Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Marceline Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Java Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Renganaden Seeneevassen - Farquahar Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality:
        "Roche Bois 1 - Debonchor Rd from Abattoir Road to Desperoux St",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Boisee Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Rodrigues Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Benitier Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Maurice Poupard Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Leonce L`Oiseau Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Renganaden Seeneevassen - Guai Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Elysee Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Brandon Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - St Pierre Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Blanche Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Military Rd (Southern Part) from Peer Jamal Shah St to Francois Xavier Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Louis Xavier Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality: "Renganaden Seeneevassen - Mariamen Temple Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - J.Serret Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Briquetterie CHA",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Veronce Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Blue Marlin Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Perimbe St from St Francois Xavier to Ambroise Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Madras St from St Francois Xavier to Little Bridge",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Renganaden Seeneevassen - Queen St from Sun Yat Sen St to Sir Edgar Laurent Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Juliet E. August Street",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Briquetterie Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Paul Toureau Region - Canal Anglais up to Nicolay Road",
      postalCode: "11702",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Bonnefin Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Reserve Canal Bathurst",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 4 - Madura Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Renganaden Seeneevassen - Remy Ollier St from Sun Yat Sen St to Sir Edgar Laurent Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - Latanier River From Trunk Road to the sea",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Corson Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Paul Toureau Region - Citrus Street",
      postalCode: "11702",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Chapelle Street",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - St Pierre Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 4 - Magon St from Noor-E-Islam - St Frnacois Xavier Street",
      postalCode: "11612",
    },
    {
      city: "Port Louis",
      locality:
        "Renganaden Seeneevassen - Royal St from Sun Yat Sen St to Edgar Laurent Street",
      postalCode: "11613",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 1 - National Rd",
      postalCode: "11614",
    },
    {
      city: "Port Louis",
      locality: "Briquetterie - Dauguet Street",
      postalCode: "11701",
    },
    {
      city: "Port Louis",
      locality: "Paul Toureau Region - Latanier River upto Nicolay Road",
      postalCode: "11702",
    },
    {
      city: "Port Louis",
      locality: "Roche Bois 2 - Cocoterie Road",
      postalCode: "11703",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Iqbal Street",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Sauzier",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Daureawoo",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Rozan",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - J.Serret Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Font George - Mer Rouge",
      postalCode: "11605",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Delhi Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Lawry Cole Street",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Beau Jardinier Street",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Gelle",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Samuel Fouquereaux",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - C.Jeewanjee Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Hospice Montfort - Nicolay Road",
      postalCode: "11606",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Duponsel Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Malakoff from Bonaparte to dry river",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Blvd Hugon from Blvd Victoria up to mountain",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Imp. Macao",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Sirdar",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - Denise Hall",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Mauritius Freeport Authority - Mer Rouge",
      postalCode: "11607",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Eastern Side of St Francois Xavier St from Magon St to Military Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Poland",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Blvd Pitot from Blvd Victoria up to mountain",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Indians",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - David St up to Sun Yat Sen Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - Desperoux Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "M.C.F.I - Mer Rouge",
      postalCode: "11608",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Hyderabad Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Rajkumar Gajadhur",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Edward St",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - J.Tranquille",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Dr Edwards Laurent Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - Dr H.A Wheldone Street",
      postalCode: "11603",
    },
    { city: "Port Louis", locality: "Mer Rouge", postalCode: "11609" },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - James Forester Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Chalets",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Kissoondary Lane",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Kleber",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Emmanuel Anquetil Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - G.Gillet Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Moulin De La Concorde - Quay D",
      postalCode: "11610",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Jardin Despaux Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Cornet",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality:
        "Vallee Pitot 2 - Malakoff st from dry Ruisseau up to canal Englais",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Latanier",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Farquhar St up to Corderie Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - J.Vigoureux Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - A.R Mohamed St (Western Side) from Magon St to Ambroisine St",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Leopold BOUR Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Hungarian",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Mamelon Vert",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Macao Street",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Joseph Riviere Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - L.Michel Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Abbe De Rouledes Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Louis Victor Ducasse Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Peltes Street",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Palmyre St",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality:
        "Camp Yoloff - Magon St from Noor E Islam St to Mariamen Temple Street",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Jummah Mosque Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - M.Gueho Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Ambroisine Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Sunny Razvi street",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Sunny Hill Lane",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Malacca",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Leoville L`Homme St up to Corderie Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - N.C Hing Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Avis Lane",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Varsovie",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 2 - Carpenter Lane",
      postalCode: "11505",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Military Rd",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Louis Pasteur Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - P.A Wiehe Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - B.Dassagne Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Crimea up to Ruisseau",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 3 - Brancion",
      postalCode: "11506",
    },
    {
      city: "Port Louis",
      locality:
        "Camp Yoloff - Military Street from Round About to Noor-E-Islam",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Northern Side of Corderie Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - Robert Surcouf Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Benares St from St Francois St to A.R Mohamed Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Hongrois street up to Ruisseau",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 3 - Imp. Orient",
      postalCode: "11506",
    },
    {
      city: "Port Louis",
      locality:
        "Camp Yoloff - Noor E Islam Mosque St Western Side From Magon St - Nicolay Power Station",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Queen St up to Corderie Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - S.Ahnee Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Bombay Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Comets street",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 3 - Orient St",
      postalCode: "11506",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Rene Maigrot",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - R.Ollier St up to Corderie Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - V.Larche Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 3 - Calcutta St from St Francois Xavier St to A.R Mohamed Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Inkerman st from Blvd victoria up to Chalets",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Galdemar",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 3 - Tagore ",
      postalCode: "11506",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Rochecouste",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "China Town - Royal St up to Corderie Street",
      postalCode: "11602",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - Wade Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Canal Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Italy",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Vallee Pitot 1 - Iqbql street",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Coringa",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Camp Yoloff - Rohan",
      postalCode: "11601",
    },
    {
      city: "Port Louis",
      locality: "Cite Roche Bois - F.Victor Street",
      postalCode: "11603",
    },
    {
      city: "Port Louis",
      locality: "Customs House - Mer Rouge",
      postalCode: "11604",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 3 - Cite Laval Street",
      postalCode: "11611",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Cotillon Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Gravier Street (S. Sivananda Street)",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Wellington Street (Jawaharlall Nehru)",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - St John Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Rozan",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Cadinouche",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Cremation Ground Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Shah - E - Islam Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Seetulsing Street (ex Washerwoman)",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Indians",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Samuel Fouqueraux",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Cock Lane",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Doorundar Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Sookdeo Bissoondoyal Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Generosity Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Klebert",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Blvd Hugon",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Ghoon",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality:
        "Tranquebar - Guillaume Giquel from Ruisseau du Pouce to M. Gandhi Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality:
        "St Denis - St Denis Street from Labourdonnais Street to M. Gandhi Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - Antonio Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Latanier",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Depinay",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Hassen Hussein",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Sebastopol Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - John Kennedy Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Tulsidas Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - Capitaine de Valence Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Military Rd",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Diego Garcia",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - I.Bacosse Soobadar",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Shakespeare Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Langlois Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality:
        "Enniskillen - MGR Leen Street from Labourdonnais Street to Promenade",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality:
        "Marie Reine de la Paix - De Courcy Street from Beaugeard Street to MGR Leen",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Sirdar",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Dr Hassen Sakir up to Paul et Viginie Street",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Joseph Francois",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality:
        "Citadelle Region - Suffren St from Mgr Gonin St to Eugene Laurent Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Mahe (Seychelles) Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Maxime de Sornay",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality:
        "Marie Reine de la Paix - Desroches Street from Beaugeard Street to MGR Leen Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Coringa",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Verte 1 - G. M. Issac from Paul Et Viginie up to Blvd Victoria",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Kankal",
      postalCode: "11503",
    },
    { city: "Port Louis", locality: "Crowland Tory", postalCode: "11406" },
    {
      city: "Port Louis",
      locality: "Tranquebar - Nazareth Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Enniskillen Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - Emyrne Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Daureawoo",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - I.Bacosse Subdar",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Khustar",
      postalCode: "11503",
    },
    { city: "Port Louis", locality: "Harbour View 1", postalCode: "11407" },
    {
      city: "Port Louis",
      locality: "Tranquebar - Pouce Road",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Mayer Street from Labourdonnais Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality:
        "Marie Reine de la Paix - Henri Le Sidaner from Beaugeard Street to MGR Leen",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Gele",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - L.Vele street",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Mawlana",
      postalCode: "11503",
    },
    { city: "Port Louis", locality: "Harbour View 2", postalCode: "11408" },
    {
      city: "Port Louis",
      locality: "Tranquebar - Prince Alfred Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Bancilhon Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - I. Levieux Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Imp. Macao",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Pellegrin",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Mosque St",
      postalCode: "11503",
    },
    { city: "Port Louis", locality: "Morc Manna", postalCode: "11409" },
    {
      city: "Port Louis",
      locality: "Tranquebar - Prince de Gale Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality:
        "Enniskillen - Raoul Rivet Street from Labourdonnais to Jenner Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - Mauritius Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - J.Tranquille",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Ruch Paul",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Oscar Grandcourt",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Bathfield Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Avice Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Justice Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality:
        "Marie Reine de la Paix - Mayer Street from Labourdonnais Street to Decourcy Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Macao Street",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Trichnapoly / Krishnaputy street",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Ramsamy Canabady",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - C.A. Piperdy Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Bon Cherville Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Independence Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - Montenot Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Malacca",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 1 - Northern side of Blvd Pitot street",
      postalCode: "11502",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Ravine",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Chankin Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Breard Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Jenner Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality:
        "Marie Reine de la Paix - Nahaboo Solim Street from Beaugeard Street to MGR Leen",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Rene Maigrot",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - A.R Nawab",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality:
        "Vallee Pitot 1 - Alma Street from Bvd Victoria to dry watercourse",
      postalCode: "11504",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Chateau D'Eau Street",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Duclos Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Cook Street",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - Poupinel de Valence Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Rochecoust",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 -  Goomany Ally",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "Tranquebar - Cotillon Lane",
      postalCode: "11410",
    },
    {
      city: "Port Louis",
      locality: "St Denis - Gayasing Street",
      postalCode: "11411",
    },
    {
      city: "Port Louis",
      locality: "Enniskillen - Boulevard Rivaze",
      postalCode: "11412",
    },
    {
      city: "Port Louis",
      locality: "Marie Reine de la Paix - St James Street",
      postalCode: "11413",
    },
    {
      city: "Port Louis",
      locality: "Cite Martial - Rohan",
      postalCode: "11501",
    },
    {
      city: "Port Louis",
      locality: "Plaine Verte 2 - Benares",
      postalCode: "11503",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Dr Yves Cantin Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Victor de la Faye Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - John Kennedy from Ruisseau du pouce to Intendance Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Bangladesh - Hesketch Bell Street",
      postalCode: "11401",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - China St from Inkerman St to La Paix Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Eugene Laurent Lane 33, 37, 43",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Edith Cll Street from Ponce Stream to Mere Barthelemy Street",
      postalCode: "11324",
    },
    { city: "Port Louis", locality: "Supreme Court", postalCode: "11325" },
    {
      city: "Port Louis",
      locality: "William Newton Region - La Poudriere Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Bangladesh - Jules Mallac Street",
      postalCode: "11401",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 2 - Dauphine St from Mgr Gonin St to La Paix Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Eugene Laurent Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Henri Le Sidaner Street from Beaugeard Street to Volcy Pougnet",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "The Peninsula (Tower)",
      postalCode: "11326",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Laroquer Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Bangladesh - Pouce Street",
      postalCode: "11401",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Dugarreau Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - G.H.D Atchia Street ( Eastern Side )",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality: "St Georges - La Brillane Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Victoria Square - Perdreau Street",
      postalCode: "11327",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Lislet Geoffroy Street upto Mgr Gonin",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - Blvd Pitot St from Blvd Victoria to China Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Guimbeau Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Herscall Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Labourdonnais Street (Western Side) from Ruisseau du Pouce to Beaugeard Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Victoria Square - Dumas Street",
      postalCode: "11327",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Lord Baden Powell Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - China / Diego garcia st from La Paix St to Edgard Laurent Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Hatch Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Mere Barthelemy Street Eastern side from Beaugeard Street to ruisseau du Pouce",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Chaussée Street from Ruisseau du Pouce to Intendance Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Maillard Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - Daulphine St from La Paix St Etienne Pellereau Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 2 - Inkerman St from Blvd Victoria to Dauphine Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "St Georges - N. Decotter Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Church Street from Mgr Gonin Street to Labourdonnais Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Mere Barthelemy Street from Ruisseau du Pouce to Poudriere Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - Diore St from La Paix St to Edgard Laurent Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Lapoter Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Nahaboo Solim Street from Beaugeard Street to Raoul Rivet",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Dauphine Street from Mgr Gonin to Jules Koenig Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Pope Hennessy Street from Labourdonnais Street to Dauphine Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - Etienne Pellereau St from SSR St to Nyon Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Leclezio Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Poivre Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Dr Ferriere Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Queen Street from Croderie Street to Duke of Edinburgh Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 1 - Lenepveu Lane 1, 2, 3",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Nyon St from La Paix St to Inkerman Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Poupinel de Valence from Beaugeard Street to Terney",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Duke of Edinburgh Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Royal Street from Corderie Street to Duke of Edinburgh Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 1 - Lenepveu Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 2 - Sir V.Naz St from Mgr Gonin St to La Paix Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Raoul Rivet Street from Mere Barthelemy Street to Labourdonnais Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Farquhar Street Corderie Street to Duke of Edinburgh Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Sir Virgile Naz Street from Mgr Gonin Street to Jules Koenig Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - Nyon St from La Paix St to Edgard Laurent Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 2 - Sornay Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - Ruisseau du Pouce from Mere Barthelemy Street to Labourdonnais Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Farquhar Street from Duke of Edinburgh to Corderie Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "William Newton Region - Suffren Street from Mgr Gonin to Pope Hennessy Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - S V Naz St from La Paix St to Sir Edgard Laurent Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 2 - St Aulaire St from La Paix St to Dugarreau Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - St Georges Street from Mere Barthelemy Street to Labourdonnais Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Felicien Mallefille Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Vieux Conseil Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 1 - St Aulaire Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 2 - Sun Yat Sen St from S.S Ramgoolam St to Dauphine Street",
      postalCode: "11403",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Dechazal Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - St Louis Street from Mere Barthelemy Street to Champs de Lovt",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - George Guibert Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Winston Churchil Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 1 - Dr H. Joonya Street",
      postalCode: "11402",
    },
    { city: "Port Louis", locality: "Champ De Mars", postalCode: "11404" },
    {
      city: "Port Louis",
      locality:
        "St Georges - Desroches Street from Beaugeard Street to Ruisseau du Pouce",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Swan Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Georges Guibert Street upto Mgr Gonin",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Bangladesh - Craston Martin Street",
      postalCode: "11401",
    },
    {
      city: "Port Louis",
      locality:
        "Blvd Victoria 1 - Epidariste Trime (Nyon) St from La Paix St to Edgard Laurent Street",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Corneille Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Dr Auguste Rouget Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Union Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "William Newton Region - Intendance Street",
      postalCode: "11328",
    },
    {
      city: "Port Louis",
      locality: "Bangladesh - Ernest Le Blanc Street",
      postalCode: "11401",
    },
    {
      city: "Port Louis",
      locality: "Blvd Victoria 1 - La Paix St Northward",
      postalCode: "11402",
    },
    {
      city: "Port Louis",
      locality: "Citadelle Region - Destaing Street",
      postalCode: "11405",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Florida Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Strauss Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Conrad Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Mount Lane",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Ruisseau des Creoles - Conde Street",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Gonin Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Tagore Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Dalembert Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Orange Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality:
        "Ruisseau des Creoles - D'Alambert Street from Dentrecastaux Street to Conde Street",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Hazlit Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Tulip Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Darcel Melotte Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Piton Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality:
        "Ruisseau des Creoles - D'Entrecastaux Street from Petrichier Square to Souillac Street (Western Side)",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Heliotrope Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Vanoogaree Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Dickens Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Tankwen Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality:
        "Ruisseau des Creoles - Deschartes Street from Petrichier Square to Lord Kitchener Street",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Iqbal Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Wagner Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Discovery Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Les Salines - Gebert Cemetery",
      postalCode: "11315",
    },
    {
      city: "Port Louis",
      locality: "Ruisseau des Creoles - E Bouchet Street",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Jasmin Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Dr. A. G. Jeetoo Hospital",
      postalCode: "11310",
    },
    {
      city: "Port Louis",
      locality:
        "La Butte Region - Entrecasteaux Southern part from St Petrichier to Souillac St Northern part",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Les Salines - Cemetery Road",
      postalCode: "11315",
    },
    {
      city: "Port Louis",
      locality: "Ruisseau des Creoles - Ruisseau des Creoles Street",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Labonte Lane",
      postalCode: "11309",
    },
    { city: "Port Louis", locality: "G.M. Tower", postalCode: "11311" },
    {
      city: "Port Louis",
      locality: "La Butte Region - Esquire Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Les Salines - Nelson Street",
      postalCode: "11315",
    },
    {
      city: "Port Louis",
      locality:
        "Ruisseau des Creoles - Souillac Street from Deschartes Street to D'Entrecastaux Eastern Side",
      postalCode: "11323",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Letard Street",
      postalCode: "11309",
    },
    { city: "Port Louis", locality: "I.B.L. Complex", postalCode: "11312" },
    {
      city: "Port Louis",
      locality: "La Butte Region - Field Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Les Salines - Robert Edward Hart Garden Allee des Filaos",
      postalCode: "11315",
    },
    {
      city: "Port Louis",
      locality: "St Georges - A. Fellafé Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality:
        "Cite Valijee - Menagerie Street from St Joseph Street to Mauritius Telecom Southern side",
      postalCode: "11309",
    },
    { city: "Port Louis", locality: "Intermediate Court", postalCode: "11313" },
    {
      city: "Port Louis",
      locality: "La Butte Region - G.E.F Poulin Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Les Salines - Western Cemetery",
      postalCode: "11315",
    },
    {
      city: "Port Louis",
      locality: "St Georges - A.L. Osman Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Bach Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Merigold Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - A. Esnouf Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - GASSITA St",
      postalCode: "11314",
    },
    { city: "Port Louis", locality: "Line Barracks", postalCode: "11316" },
    {
      city: "Port Louis",
      locality:
        "St Georges - Beaugeard Street (Northern part) from Labourdonnais Street to Mere Barthelemy Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Banyan Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Milton Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Andrews Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Grl Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Mauritius Bulk Sugar Terminal (Building)",
      postalCode: "11317",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Champ de Lovt Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Canal Dayot Street",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Moliere Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Angousty Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Hossen Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Municipality of Port Louis",
      postalCode: "11318",
    },
    {
      city: "Port Louis",
      locality: "St Georges - Colin Barthelemy Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Chopin Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Oaks Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality:
        "La Butte Region -  Mgr Leen from Armory Bridge to Andrews Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - M. Giraud Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "New Government Centre",
      postalCode: "11319",
    },
    {
      city: "Port Louis",
      locality:
        "St Georges - De Courney Street from Beaugeard Street to St Georges Street",
      postalCode: "11324",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Dahlia Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality:
        "Cite Valijee - Royal Road Western part from St Joseph Street to Flamboyant Street",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Bandelaire Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Madagascar Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Port Louis Waterfront (Harbour up to Fish Port)",
      postalCode: "11320",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Ebony Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Rubinstein Lane",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Belvedere Street",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality:
        "La Butte Region - Maupin Street from Entrecasteaux Street to Mountain",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "Emmanuel Anquetil Building",
      postalCode: "11321",
    },
    {
      city: "Port Louis",
      locality: "Cite Valijee - Flamboyant Street",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality:
        "Cite Valijee - St Joseph Street Western side from Royal Road to Menagerie Street",
      postalCode: "11309",
    },
    {
      city: "Port Louis",
      locality:
        "La Butte Region - Brabant Street from Maupin Street to Andrews Street (Eastern side)",
      postalCode: "11314",
    },
    {
      city: "Port Louis",
      locality: "La Butte Region - Mootoosamy Street",
      postalCode: "11314",
    },
    { city: "Port Louis", locality: "Royal College", postalCode: "11322" },
    {
      city: "Port Louis",
      locality:
        "Plaine Lauzun Industrial Zone - River from behind St Louis power station up to bus station",
      postalCode: "11222",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Fook Seung Road",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Chevrot Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Impasse Gansseran",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Reserve Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Decaen Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Lauzun Industrial Zone - Royal Road from Trunk Road to Bus Station",
      postalCode: "11222",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Galdemar Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - Edith Cll Street from Mere Barthelemy Street to John Kennedy Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Impasse Gansseran",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Tamat Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Deconti Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality:
        "Plaine Lauzun Industrial Zone - Trunk Road from Royal Road to St Louis Power Station",
      postalCode: "11222",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Gregoire Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - John Kennedy Street from Jemmapes to Edith Cll Street (Eastern Side)",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Impasse Jolivet",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Tanner Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Engineer Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality: "Police Flats (Bell Village)",
      postalCode: "11223",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Jacobs Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - John Kennedy Street from Ruisseau Pouce to Edith Cll Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Jean Baptiste Lamasse",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - A. N Noormohamed Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Falcan Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality:
        "Pont St Louis: Trunk Road from St Louis Stream 1 to St Louis Stream 2",
      postalCode: "11224",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - L.A. Hugues Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - La Gaieté Street from Orleans Street to Beaugeard Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Joseph Lane",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Almadina Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Foncault Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality: "Pailles East -  Claude Delaitre",
      postalCode: "11220",
    },
    { city: "Port Louis", locality: "Soreze", postalCode: "11225" },
    {
      city: "Port Louis",
      locality: "Bain des Dames - N. Osman Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Orleans Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Nayazamana Street",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Odette Ernest Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Caudan - La Fleur Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality: "Pailles East - Manaram Lane",
      postalCode: "11220",
    },
    { city: "Port Louis", locality: "SVICC", postalCode: "11226" },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Nathaniel Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Reverand Lebrun Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Roseline Street",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality:
        "Cassis 3 - Edgard Aubert Street from Trunk Road to Odette Ernest Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Motais Street from Maupin Street to Caudan Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality: "Pailles East - Mountain View",
      postalCode: "11220",
    },
    {
      city: "Port Louis",
      locality: "Terrasson Lower - Iris Street",
      postalCode: "11227",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Pezanie Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Sir Celicourt Antelme Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Albercrombie Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality:
        "Cassis 3 - Edgard Gallet Street from Almadina Street to Trunk Road",
      postalCode: "11305",
    },
    { city: "Port Louis", locality: "Caudan Waterfromt", postalCode: "11307" },
    {
      city: "Port Louis",
      locality: "Pailles West - Captain Ellis Street",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Terrasson Lower - Lauriers Street",
      postalCode: "11227",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Stevenson Lane",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - St Georges Street from Mere Barthelemy Street to Barracks Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Douglas Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Johanna Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Central Market (Both wings)",
      postalCode: "11308",
    },
    {
      city: "Port Louis",
      locality: "Pailles West - Jackaria Street",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Terrasson Lower - Rosiers Street",
      postalCode: "11227",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - W. Hewitson Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - St Louis Street from Mere Barthelemy Street to Barracks",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Dundenald Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality:
        "Cassis 3 - Maupin Street (Southern side from Round About to Brabant Street)",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Pailles West - Janoo Lane",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Terrasson Lower - Terrasson Street",
      postalCode: "11227",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - Auguste Rouget from Mere Barthelemy to Jemmapes Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - C.H. Leal Lane",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality:
        "Cassis 2 - Edgard Aubert Street from Trunk Road to Kwantee Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Motais Street from Maupin Street to Joana Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality:
        "Pailles West - Pailles Junction Road from Trunk Road to Cite Mauvillac",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Bain des Dames Coast Road",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Barracks Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Cassis Government School",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Edgard Gallet Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Oct Sandapa Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Pailles West - St Vincent de Paul ",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Bain des Dames Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Bolton Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Hindu House",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Malborough Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Redoute Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Pailles West - Timol Lane",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Boodhun Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Brown Sequard Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Impasse 332",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Praslin Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Seychelles Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality: "Pailles West - Velvindron Street",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Charron Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality: "Barracks Region - Brown Sequard Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Impasse Delance",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Renganaden Seeneevassen Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Cassis 3 - Victor K Vern Street",
      postalCode: "11305",
    },
    {
      city: "Port Louis",
      locality:
        "Pailles West - Western Side of Trunk Road from St Louis rivulet 2 to Pailles Junction",
      postalCode: "11221",
    },
    {
      city: "Port Louis",
      locality: "Bain des Dames - Edwards Street",
      postalCode: "11301",
    },
    {
      city: "Port Louis",
      locality:
        "Barracks Region - Chaussée Street from Ruisseau Pouce to Edith Cll Street",
      postalCode: "11302",
    },
    {
      city: "Port Louis",
      locality: "Cassis 1 - Impasse Demerez",
      postalCode: "11303",
    },
    {
      city: "Port Louis",
      locality: "Cassis 2 - Reserve Street",
      postalCode: "11304",
    },
    {
      city: "Port Louis",
      locality: "Caudan - Caudan Street",
      postalCode: "11306",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Mosque Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - La Fleur Road",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Cardinal 4",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perroquet 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Pailles - Bonnefin Street",
      postalCode: "11219",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Purmah Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Mauvilac Paints",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Cardinal 5",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perroquet 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Pailles - Entry of Bonnefin Road upto Mountain Road",
      postalCode: "11219",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Soobadar Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Pailles Kaliamen Temple Street",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Claude De Delaitre",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perroquet 3",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Pailles - Riverside Street",
      postalCode: "11219",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock -  Citronelle",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Pearl ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Colline No 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perroquet 4",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Pailles - St Louis Rivulet 2 up to Mountain",
      postalCode: "11219",
    },
    {
      city: "Port Louis",
      locality: "GRNW - James Russel Street",
      postalCode: "11210",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock -  Conseil",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Pembas",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Colline No 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perroquet 5",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Pailles East - Anse Courtois",
      postalCode: "11220",
    },
    { city: "Port Louis", locality: "Informatic Park", postalCode: "11211" },
    {
      city: "Port Louis",
      locality: "Morc Le Rock -  Framboises",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Roland Maurel ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Conde 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perruche 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "La Tour Koenig East - Excell  (East)",
      postalCode: "11212",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock -  Sapin",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Roshan Road",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Conde 4",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perruche 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Ahmed Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock -  Talipot",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Shreemati Indira Gandhi Road",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Conde 5",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perruche 3",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies - AllyHossen lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Axess",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Silver ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Conde 7",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perruche 4",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies -  Florimant",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Baichoo Lane",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Bengali 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Crecerlle 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Peruche 5",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Bali Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Deepun Lane",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Bengali 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Dodo 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Peruche 6",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Baloram Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Diamond ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Bengali 3",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Dodo 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Pingouin No 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Buckredun Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Emerald ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Bengali 4",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Dodo 3",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Pingouin No 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Impasse Purmah",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Gold ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Cardinal 1",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Dodo 4",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality:
        "Montebello - Western Side of Trunk Road from Ring Road to Pailles Junction",
      postalCode: "11216",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Les Guibies Branch Road",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Iqbal ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Cardinal 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perdrix 2",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Montebello Industrial Zone",
      postalCode: "11217",
    },
    {
      city: "Port Louis",
      locality: "Guibies - Modoo Lane",
      postalCode: "11213",
    },
    {
      city: "Port Louis",
      locality: "Morc Le Rock - Jade ",
      postalCode: "11214",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Cardinal 3",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality: "Morc Raffray -  Perdrix 3",
      postalCode: "11215",
    },
    {
      city: "Port Louis",
      locality:
        "Montee S - From P aux Sables Junction to B River Junction (Western Side)",
      postalCode: "11218",
    },
    {
      city: "Port Louis",
      locality: "Verger Mangue - Verger mangues St 1",
      postalCode: "11126",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Orchide Street",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality:
        "Bell Village - Menagerie Road Southern Side from Brabant Street to St Joseph Road",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Madrassa Road",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Canal Dayot (both sides) - Canal Dayot Street",
      postalCode: "11207",
    },
    {
      city: "Port Louis",
      locality: "GRNW - Batterie Road",
      postalCode: "11210",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Discovery",
      postalCode: "11127",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Palmiers Street",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - MGR Leen from Kiosque to Post Office",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Philippe Rousset",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Canal Dayot (both sides) - Delta Lane",
      postalCode: "11207",
    },
    {
      city: "Port Louis",
      locality: "GRNW - Canal Dayot Street.",
      postalCode: "11210",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Columbia",
      postalCode: "11127",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Pellican",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - Old Moka Road upto entry of CWA",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Pierre Arthur Rayeroux",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Canal Dayot (both sides) - Impasse Canay Dayot",
      postalCode: "11207",
    },
    {
      city: "Port Louis",
      locality: "GRNW - Dr Henri Perrot Lane",
      postalCode: "11210",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Collins",
      postalCode: "11127",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Short Lane",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - Paul Fercy Adele Street",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Road A",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Canal Dayot (both sides) - James Mercier Lane",
      postalCode: "11207",
    },
    { city: "Port Louis", locality: "GRNW - J.E Pitchen", postalCode: "11210" },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Comet",
      postalCode: "11127",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Sparrow Street",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality:
        "Bell Village - Port Louis St Jean Road North from St Joseph to Menagerie Street",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Road B",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Canal Dayot (both sides) - Lamare Jean Baptiste Street",
      postalCode: "11207",
    },
    {
      city: "Port Louis",
      locality: "Rey - Novembriers",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Armstrong",
      postalCode: "11127",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Terasson",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - St Joseph East",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Robert Stain",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Acacia Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Rey - Novembriers lane 1",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Ariane",
      postalCode: "11127",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Tulipes Street",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - St Patrick Street",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality:
        "Camp Chapelon West - St Louis River from Trunk Road to behind St Louis Power Station",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Camelia Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Rey - Novembriers lane 2",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Appollo",
      postalCode: "11127",
    },
    { city: "Port Louis", locality: "UTM", postalCode: "11134" },
    { city: "Port Louis", locality: "Borstal", postalCode: "11203" },
    {
      city: "Port Louis",
      locality:
        "Camp Chapelon West - Trunk Road East from Plaine Lauzun to St Louis Bridge",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Flamboyant Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Rey - Sunhill",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Verger Le Bain - Aldrin",
      postalCode: "11127",
    },
    { city: "Port Louis", locality: "Verger Mangue", postalCode: "11135" },
    {
      city: "Port Louis",
      locality: "Borstal - Borstal Rehabilitation Centre",
      postalCode: "11203",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Volcy de Senneville Street",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Jackarandas Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Rey - Tournesol",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Pointe aux Sables - Royal Rd",
      postalCode: "11129",
    },
    {
      city: "Port Louis",
      locality: "Anse Courtois - Trunk Rd from Pailles Junction to Ring Rd",
      postalCode: "11201",
    },
    {
      city: "Port Louis",
      locality:
        "Camp Chapelon East - Trunk Road plus Old Moka Road from Entry of CWA upto entry of Bonnefin Street",
      postalCode: "11204",
    },
    {
      city: "Port Louis",
      locality: "Cite Borstal - Dr Manilall Street",
      postalCode: "11206",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Jasmin Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Rey - Trochettias",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Pointe aux Sables - Link Rd",
      postalCode: "11129",
    },
    {
      city: "Port Louis",
      locality: "Anse Courtois - Southern part of Junction Rd",
      postalCode: "11201",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon East - Henri Seneck Street",
      postalCode: "11204",
    },
    {
      city: "Port Louis",
      locality: "Cite Borstal - F.l Maurel Street",
      postalCode: "11206",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Lilas Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Sohun - Cyprus",
      postalCode: "11124",
    },
    {
      city: "Port Louis",
      locality: "Pointe aux Sables - Flamboyants",
      postalCode: "11129",
    },
    {
      city: "Port Louis",
      locality:
        "Bell Village - Brabant Road South from Menagerie Street to Paul Fercy Adele Street",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon East - James Slade Street",
      postalCode: "11204",
    },
    {
      city: "Port Louis",
      locality: "Cite Borstal - Jean Lebrun Street",
      postalCode: "11206",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Miguet Street",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Sohun - Pigeon",
      postalCode: "11124",
    },
    {
      city: "Port Louis",
      locality: "Pointe aux Sables - Printemps",
      postalCode: "11129",
    },
    {
      city: "Port Louis",
      locality:
        "Bell Village - Eastern Side of Trunk Road from Royal Road to Kiosque",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon East - William Stanley",
      postalCode: "11204",
    },
    {
      city: "Port Louis",
      locality: "Cite Borstal - Leoville Lhomme Street",
      postalCode: "11206",
    },
    {
      city: "Port Louis",
      locality: "Cite Mauvillac - Pailles Junction West (part)",
      postalCode: "11208",
    },
    {
      city: "Port Louis",
      locality: "Sohun - Peacock",
      postalCode: "11124",
    },
    {
      city: "Port Louis",
      locality: "Residence Coquillage",
      postalCode: "11131",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - From Kiosque to Paul Fercy Adele",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - De Rosnay Street",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Cite Borstal - Remy Ollier Street",
      postalCode: "11206",
    },
    {
      city: "Port Louis",
      locality: "Domaine Les Pailles",
      postalCode: "11209",
    },
    {
      city: "Port Louis",
      locality: "Verger Mangue - Sohun Lane",
      postalCode: "11126",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Martello Street (southern side)",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - Lime Street",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Desire Sicard Street",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Cite Borstal - Seeneevassen Street",
      postalCode: "11206",
    },
    {
      city: "Port Louis",
      locality: "GRNW - Adolphe Rolando",
      postalCode: "11210",
    },
    {
      city: "Port Louis",
      locality: "Verger Mangue - Verger mangues St",
      postalCode: "11126",
    },
    {
      city: "Port Louis",
      locality: "Terrason 1 (west) - Multipliant Street",
      postalCode: "11133",
    },
    {
      city: "Port Louis",
      locality: "Bell Village - Link Road",
      postalCode: "11202",
    },
    {
      city: "Port Louis",
      locality: "Camp Chapelon West - Impasse Rayeroux",
      postalCode: "11205",
    },
    {
      city: "Port Louis",
      locality: "Canal Dayot (both sides) - C.A.Macpersom",
      postalCode: "11207",
    },
    {
      city: "Port Louis",
      locality: "GRNW - Batterie Lane",
      postalCode: "11210",
    },
    { city: "Port Louis", locality: "Camp Firinga", postalCode: "11101" },
    {
      city: "Port Louis",
      locality: "Rey - Bambous",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Manguiers",
      postalCode: "11121",
    },
    { city: "Port Louis", locality: "Cite Lateka", postalCode: "11105" },
    {
      city: "Port Louis",
      locality: "Rey - Bosquet",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Marie Madeleine",
      postalCode: "11121",
    },
    { city: "Port Louis", locality: "Cite La Lumiere", postalCode: "11106" },
    {
      city: "Port Louis",
      locality: "Rey - Cactus",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Nectarine",
      postalCode: "11121",
    },
    { city: "Port Louis", locality: "Kensington", postalCode: "11107" },
    {
      city: "Port Louis",
      locality: "Rey - Catelyas",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Neptune",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "La Tour Koenig Industrial Zone",
      postalCode: "11109",
    },
    {
      city: "Port Louis",
      locality: "Rey - Cerisiers",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Noisettes",
      postalCode: "11121",
    },
    { city: "Port Louis", locality: "Marguerite Phase 1", postalCode: "11110" },
    {
      city: "Port Louis",
      locality: "Rey - COLBERT",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "D'Hotman",
      postalCode: "11111",
    },
    {
      city: "Port Louis",
      locality: "Rey - Coqueluches",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Fon Sing",
      postalCode: "11112",
    },
    {
      city: "Port Louis",
      locality: "Rey - Fuschias",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Fortune",
      postalCode: "11113",
    },
    {
      city: "Port Louis",
      locality: "Rey - Goldem Rd",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Ibrahim Dawood - Manguiers ",
      postalCode: "11115",
    },
    {
      city: "Port Louis",
      locality: "Rey - Groseilles",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Ibrahim Dawood - Badamiers ",
      postalCode: "11115",
    },
    {
      city: "Port Louis",
      locality: "Rey - Jacquiers",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Ibrahim Dawood - Jacquiers ",
      postalCode: "11115",
    },
    {
      city: "Port Louis",
      locality: "Rey - Jamalacs",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Le Vieux",
      postalCode: "11119",
    },
    {
      city: "Port Louis",
      locality: "Rey - Jupiter",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Accacia",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Lantana",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Aloes",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Link Rd",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Badamiers ",
      postalCode: "11121",
    },
    {
      city: "Port Louis",
      locality: "Rey - Mandarine",
      postalCode: "11121",
    },
    { city: "Olivia", locality: "Louis Renaud", postalCode: "41408" },
    { city: "Olivia", locality: "Deep River", postalCode: "41409" },
    { city: "Olivia", locality: "Hamid", postalCode: "41410" },
    { city: "Olivia", locality: "Louis Renaud", postalCode: "41411" },
    { city: "Olivia", locality: "Trois Ilots", postalCode: "41412" },
    { city: "Olivia", locality: "VRS Kewal Nagar", postalCode: "41413" },
    { city: "Olivia", locality: "Olivia", postalCode: "41414" },
    { city: "Olivia", locality: "Plaines Bananes", postalCode: "41415" },
    { city: "Olivia", locality: "Rousset Rd (Olivia)", postalCode: "41416" },
    { city: "Olivia", locality: "Camp Beau Bois", postalCode: "41401" },
    { city: "Olivia", locality: "SILWF - Olivia", postalCode: "41417" },
    { city: "Olivia", locality: "Camp Jakeeree", postalCode: "41402" },
    { city: "Olivia", locality: "Trois Ilots", postalCode: "41418" },
    { city: "Olivia", locality: "CHA + (state land)", postalCode: "41403" },
    { city: "Olivia", locality: "Deep River S.E", postalCode: "41404" },
    { city: "Olivia", locality: "EDC", postalCode: "41405" },
    {
      city: "Olivia",
      locality: "Kewal Nagar (Belle Rive)",
      postalCode: "41406",
    },
    { city: "Olivia", locality: "La Nourrice", postalCode: "41407" },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Blue Lane",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality:
        "Tefles Housing Estate - Guy Rozemont (North Part) from Jinnah to Morc Bholah",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Boundary Lane",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Haendel Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Canda (Canal) Part",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality:
        "Tefles Housing Estate - Jinnah  (West) from C.D Garde to G. Rozemont",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Fleur de Lys",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - M.A Dinnah Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Geranium",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Mozart Lane",
      postalCode: "71176",
    },
    { city: "Rose Hill", locality: "Trefles 3 - Glaeil", postalCode: "71175" },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Palmier Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Green Lane",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Schubert Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Marguerite Part",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Schuman Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Pillay Lane",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Soudun Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - R.Seeneevassen St",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Bach Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Rozemont (South) Jeetoo to Berthaud",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Berlioz Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality:
        "Trefles 3 - Boundary from Berthaud to Winners (North Side Only)",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Berthaud from C.D Garde to G Rozemont",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Cactus ",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Berthaud",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Orchides ",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Chopin Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Aquarelle Lane",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality: "Tefles Housing Estate - Cocotiers Lane",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 3 - Berthaud from Boundary to Boundary Lane",
      postalCode: "71175",
    },
    {
      city: "Rose Hill",
      locality:
        "Tefles Housing Estate - C.D. Garde (South Side) Morc Bholah to Jinnah",
      postalCode: "71176",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Larche St",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - M. Lacoste",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Chady Lane",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Tirvengadum",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - C.D. Garde (South Side) Panchoo to Jinnah",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Jeetoo Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Malartic North Side",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Mariamen Temple",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality:
        "Stanley 2 - Corp D. Garde (North Side Only) Berthaud to Hugnin",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Boundary (North Side) from Panchoo to Hugnin",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Sawmy  from M. Gandhi  to Jinnah ",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Jinnah (East) from C.D. Garde to Rozemont",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Promenade Roland Armand",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Mnanacourt",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Goyaviers ",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - C.D. Garde (Southern Side) Panchoo to Hugnin",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Ameerally Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Le Beau Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Rev Lebrun (Southern Side)",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - N. Irlen",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - D Amen Temple Rd (Pagoda)",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Manilall (East Side) from Panchoo to Hugnin",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Berthaud from Rozemont to Boundary Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - M. Gandhi St",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Royal Malartic to Rev Lebrun",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Panchoo Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Gajadhur",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Dr Ferriere ",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Bougainvilles ",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Mahatma Gandhi ",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Selmour Ahnee",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Suzor",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - R. Rivet Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Hugnin (West Side) from C.D. Garde to St Anne",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Dr Nooraya Street",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Bradshaw St",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Mahatma Gandhi Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Vandermersch (Malartic to S Ahnee)",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Swami Sivananda Road",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Ratsitatane Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Jinnah  from St Anne to C.D. Garde",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Ferriere Lane",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Crystal Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Marguerite (Part)",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - C.D. Gaulle",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - A.M. Sookia",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality:
        "Stanley 1 - Ratsitatane (South Side Only) from Hugnin to Berthaud",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - M. Gandhi  from St Anne to C.D. Garde",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Hugnin (West Side) from C.D. Garde to Boundary",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Crystal Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Panchoo Lane A",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - De Caen",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Antelme Lane 1",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Roopun Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Mathuvirin St",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Imp Chasteauneuf",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Dr Jeetoo ",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Panchoo (One Side) from Boundary to C.D. Garde",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Dr E. Ythier",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Antelme Lane 2",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - School Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Panchoo Rd from St Anne to C.D. Garde",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Manilall from Hugnin to Panchoo (Stanley )",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Dr M. Cure St",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Dr Etienne",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality:
        "Stanley 1 - Berthaud (East Side Only) from Ratsitatane to St Anne",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - St Anne (North Side Only) from Berthaud to Hugnin",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Pillay Lane",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Pagoda  from C.D. Garde to Rozemont",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Dr Manilall Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - G. Pitot",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Bradshaw ",
      postalCode: "71170",
    },
    { city: "Rose Hill", locality: "Stanley 1 - Thakoor", postalCode: "71170" },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Queen St",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Panchoo (East Side) from Boundary to C.D. Garde",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - E. Anquetil St",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - G. Soobhan",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - C. Antelme from Hugnin to Irlen",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Toureau 3",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Rosiers Lane",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Panchoo Lane B",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Galaxy Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Guy Blackburn",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality:
        "Stanley 1 - Hugnin from Ratsitatane to St Anne (West Side Only)",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Venkatasamy Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - St Anne Rd (South Part) from Berthaud to Hugnin",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - R.E Hart",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Gaya Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Impasse A. Loumeau",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Iqbal Lane",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Barossy Lane",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Tagore Lane",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 1 - Sawmy (From Ferriere to Panchoo)",
      postalCode: "71173",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Hirondelle Lane",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 9 - Larche Lane",
      postalCode: "71368",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 1 - Jadoo (Seeneevassen)",
      postalCode: "71170",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Berthaud (East Side) from C.D. Garde to St Anne",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Stanley 2 - Tamariniers ",
      postalCode: "71171",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Boundary (South Side) from Panchoo to Winners",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Trefles 2 - Imp Jeetoo",
      postalCode: "71174",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Willoughby",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - C. Antelme (south)",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Dr. de Chazal from Inkerman to Cure",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Beaugeard",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Sholay (Gladstone Blondeau)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Boundary (north side) D Taylor to river",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Poupinel De Valence",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Ambrose  (south)",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Dr Maurice Cure (north)",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Dr Lorens",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Blondeau",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Stevenson",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - District Court",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - R. Rochecouste",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Ambrose Lane",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Dr. de Chazal Antelme to Cure",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Dr Maurice Cure (south)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Boundary North (Hugnin to Laboudonnais)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - Balgobin",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Duncan Taylor St",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 8 - Royal Rd East side from Malartic to Post Office",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - C. Antelme (north)",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Dumas",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - E. Pellereau",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Dr Bour",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 6 - Boundary North (Promenade to Laboudonnais)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - E. Francois",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Roux St",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Farquhar",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Captan Bruce",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Inkerman (Royal to Cure)",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Gladstone (north side)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 5 - Gladstone (south side) Hugnin to Labourdonnais",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 6 - Gladstone (south side) Cure to Labourdonnais",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Elias",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - S. Telemaque",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - G. Bowen",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - E. Serret",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Boodhun from Cure to Inkerman",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Inkerman (Hugnin to Cure)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Hugnin (east side) Boundary-Gladstone",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - J.C. D'Avoine",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Health Centre",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Hugnin (east) from Ambrose to P. Laval",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Edison",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - L. L'Homme from Cure to Inkerman",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - L. L'Homme (Gladstone to Cure)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 5 - Labourdonnais (west) Gladstone to Boundary",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 6 - Labourdonnais (east) Gladstone to Boundary",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Moka Rd (J. Nyerere)",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Imp Milien",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Gordon",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Mamet",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Labourdonnais (Gladstone to Cure)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Laplace (Gladstone to Hurdowar)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - Leoville L'Homme (Gladstone to Hurdowar)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Police Hqtrs",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - L Regis",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Hugnin (east) from Ambrose to C. Antelme",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Notre Dame De Lourdes",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Laplace (Gladstone to Inkerman)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Mallac (Gladstone to Blondeau)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - Malaval",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Royal Road from Boundary to Round About",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - La Martine",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Joseph Riviere",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 3 - Royal Rd (west side) from Round About to Antelme",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Mallac (Gladstone to Prince of Wales)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - P. Camille",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - Pasteur Badaux",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Sir Virgil Naz",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Milton",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - L. L'Hoste",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Singery from Cure to Antelme",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Prince of Wales",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - P. Neyrolles",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 6 - Pere Jean de Roton (Promenade to Labourdonnais)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 7 - Telephone Exchange",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Pere Laval Street (south)",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Leguen",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Remono from Cure to Inkerman",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - R. Boodhun",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 5 - Pere Jean de Roton (Hugnin to Labourdonnais)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - Promenade Roland Armand",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 7 - Vandermersh (east) from round about to CEB",
      postalCode: "71366",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Raymond Peril",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 2 - Royal Rd (west) from C.Antelme to Ambrose",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Sir Charles Lees",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - S. Soopramanien from Hugnin to Cure",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Promenade R.Armand",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - R. Hurdowar (Promenade to Labourdonnais)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Impasse Louis Couacaud",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality:
        "Rose Hill Centre 1 - Royal Rd (west) from Pere Laval to Ambrose",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Seide Gelle",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Sonnee Mosque",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - Sholay (Gladstone to Prince of Wales)",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - R. Hurdowar (Hugnin to Labourdonnais)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - Remono (bus stop to Dhanjee)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Impasse St Ignace",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Sir Edgar Laurent",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - St Joseph Lane",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 3 - Thierry",
      postalCode: "71362",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Anquetil",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - S. Balgobin (up to Labourdonnais)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - S. Balgobin (D Taylor to Labourdonnais)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Kennedy",
      postalCode: "71367",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Wellington",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 2 - Thomy Rousset",
      postalCode: "71361",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 4 - De Singery from Cure to Inkerman",
      postalCode: "71363",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - Atchia",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 5 - S. Dhanjee (Hugnin to Labourdonnais)",
      postalCode: "71364",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 6 - S. Dhanjee (Remono to Labourdonnais)",
      postalCode: "71365",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 8 - Malartic (Southern Part)",
      postalCode: "71367",
    },
    { city: "Rose Hill", locality: "Hen Heights", postalCode: "71321" },
    {
      city: "Rose Hill",
      locality: "Larcher",
      postalCode: "71337",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Hugnin (west side) from R. Brunes to Pigeot",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Richard ",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Residence Clos Verger",
      postalCode: "71354",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance - Ratsitatane (north) from La Reine to Allaman",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 2 - De Plevitz  (from Jhuboo to Mere Theresa)",
      postalCode: "71259",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - C. David",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Mandarin Court", postalCode: "71322" },
    { city: "Rose Hill", locality: "Narain", postalCode: "71238" },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Joseph G. ",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Giroday  (from Hugnin to Beau Bois) both sides",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Residence La Concorde (NHDC)",
      postalCode: "71255",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance - Roches Brunes  (South) from La Reine to Allaman",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 2 - Fareed Muttur Street",
      postalCode: "71259",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Celestin Lane",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Market Rose Hill", postalCode: "71323" },
    { city: "Rose Hill", locality: "Rogers", postalCode: "71339" },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Pigeot  (north side from Allaman to Hugnin)",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - St Louis  from Pigeot to Ratsitatane",
      postalCode: "71349",
    },
    { city: "Rose Hill", locality: "Residence Malartic", postalCode: "71356" },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance - Sister Clemence  from La Reine to Allaman",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 2 - Giroday  (from Jhuboo to Franchette)",
      postalCode: "71259",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Dr Raoul Felix",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Mont Royal", postalCode: "71324" },
    { city: "Rose Hill", locality: "N.P.F Building", postalCode: "71340" },
    {
      city: "Rose Hill",
      locality:
        "Plaisance 1 - Roches Brunes  (southern side from Hugnin to H. Allaman)",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Vincent  (from Pigeot to Marie Clemence)",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance - Allaman (west) from Ratsitatane to Roche Brunes ",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Ste Therese ",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 2 - J. Franchette St (Limit VIII)",
      postalCode: "71259",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Ernest",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Morc Gaya", postalCode: "71225" },
    {
      city: "Rose Hill",
      locality: "NHDC C Le Vieux - Geranium",
      postalCode: "71241",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - St Louis  (from R. Brunes  to Pigeot )",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance H.E - Allaman (East) from Clemence to Piegot",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Berthe Street",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Strafford Mayer Street",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 2 - Maxime Remy St (Limit VI)",
      postalCode: "71259",
    },
    { city: "Rose Hill", locality: "Morc Ah Fouye", postalCode: "71126" },
    {
      city: "Rose Hill",
      locality: "NHDC C Le Vieux - Begonia",
      postalCode: "71242",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Tranquille ",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality:
        "Plaisance H.E - Beau Bois  (West) from Marie Clemence to Pigeot",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Bois Noir Street",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 1 - De Plevitz  (from La Reine St to Jhuboo St)",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 2 - Mere Theresa St (Limit VII)",
      postalCode: "71259",
    },
    { city: "Rose Hill", locality: "Morc Balgobin", postalCode: "71327" },
    {
      city: "Rose Hill",
      locality: "NHDC C Le Vieux - Chrysantheme",
      postalCode: "71243",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Vincent  (from De Plevitz to Pigeot)",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance H.E - Djibao Street",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - De Plevitz  from La Reine to Allaman",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 1 - Dr. S. Jhuboo Street (whole)",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 2 - Ratsitatane (north) from Jhuboo to Concorde",
      postalCode: "71259",
    },
    { city: "Rose Hill", locality: "Morc Berthaud", postalCode: "71128" },
    {
      city: "Rose Hill",
      locality: "NHDC C Le Vieux - Dalhia",
      postalCode: "71244",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Allaman St (East) from Clemence to Ratsitatane",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance H.E - Giroday from Beau Bois to Allaman",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Donald F. St",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 1 - Giroday  (from La Reine St to Jhuboo St)",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 2 - Roches Brunes  (south) from Jhuboo to Concorde",
      postalCode: "71259",
    },
    { city: "Rose Hill", locality: "Morc Bholah", postalCode: "71129" },
    {
      city: "Rose Hill",
      locality: "NHDC C Le Vieux - Eglantine",
      postalCode: "71245",
    },
    {
      city: "Rose Hill",
      locality:
        "Plaisance 2 - Ratsitatane St (north side) from Hugnin to Allaman",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance H.E - Lewis Street",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Dr. N. Luckeenarain  (Bois Noir)",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 1 - Idrice Goomany St",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 2 - Rue de la Concorde (eastern side)",
      postalCode: "71259",
    },
    { city: "Rose Hill", locality: "Morc Chady", postalCode: "71230" },
    {
      city: "Rose Hill",
      locality: "NHDC C Le Vieux - Flamboyant",
      postalCode: "71246",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Hugnin (west) from Pigeot to Ratsitatane",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance H.E - M.G.R Emmanuel",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Emmanuel E-Cotte ",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 1 - La Reine St (whole)",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 2 - Sister Clemence  (from Jhuboo to Franchette)",
      postalCode: "71259",
    },
    { city: "Rose Hill", locality: "Morc Gopal", postalCode: "71231" },
    { city: "Rose Hill", locality: "Place Margeot", postalCode: "71347" },
    {
      city: "Rose Hill",
      locality:
        "Plaisance 2 - Pigeot  (southern side) from Hugnin to Beau Bois",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality:
        "Plaisance H.E - Piegot  (southern side from Beau Bois to Allaman)",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Giroday  from La Reine to Allaman",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 1 - Martin Luther King Street",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - A. Gelle",
      postalCode: "71360",
    },
    {
      city: "Rose Hill",
      locality: "Morc Narain (terrain)",
      postalCode: "71132",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Auffray ",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Beau Bois  (East) from Marie Clemence to Pigeot",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality:
        "Plaisance H.E - Sister Clemence (north) from Beau Bois to Allaman",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - I. M. Kalla  (Berthe)",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 1 - Pigeot  (from La Reine St to Jhuboo St)",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Abbe Harel",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Morc Nouvelle Ville", postalCode: "71233" },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Churchill ",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - Sister Clemence (south) Allaman to Beau Bois",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance H.E - Vencatasamy ",
      postalCode: "71350",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - M. Speville ",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 1 - Ratsitatane (north) from La Reine to Jhuboo",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Ambrose  (north)",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Galerie Evershine", postalCode: "71318" },
    { city: "Rose Hill", locality: "Morc Seeburn", postalCode: "71234" },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - De Plevitz  (from Hugnin to Allaman)",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - L'Anglois ",
      postalCode: "71349",
    },
    {
      city: "Rose Hill",
      locality: "Queen Elizabeth College",
      postalCode: "71351",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Maillard ",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance 1 - Rev Pere Dufay Street",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Andre Glover",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Galerie Royale", postalCode: "71319" },
    { city: "Rose Hill", locality: "Morc Sookia", postalCode: "71135" },
    {
      city: "Rose Hill",
      locality: "Plaisance 1 - Fleuriot ",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality: "Plaisance 2 - De Chazal ",
      postalCode: "71349",
    },
    { city: "Rose Hill", locality: "Queen Courts", postalCode: "71352" },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Mariamen Kovil  (Stafford Mayer)",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 1 - Roches Brunes  (South) from La Reine to Jhuboo",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - B. Blackburn",
      postalCode: "71360",
    },
    { city: "Rose Hill", locality: "Govinden Court", postalCode: "71320" },
    { city: "Rose Hill", locality: "Morc St Andrews", postalCode: "71336" },
    {
      city: "Rose Hill",
      locality:
        "Plaisance 1 - Hajee Allaman St (east side from R Brunes  to Pigeot)",
      postalCode: "71348",
    },
    {
      city: "Rose Hill",
      locality:
        "Plaisance 2 - Sister Clemence  from Hugnin to Beau Bois (both sides)",
      postalCode: "71349",
    },
    { city: "Rose Hill", locality: "Renown Building", postalCode: "71353" },
    {
      city: "Rose Hill",
      locality: "Roche Brunes/Plaisance - Pigeot  from La Reine to Allaman",
      postalCode: "71254",
    },
    {
      city: "Rose Hill",
      locality:
        "Roche Brunes/Plaisance 1 - Sister Clemence  (from La Reine St to Jhuboo St)",
      postalCode: "71258",
    },
    {
      city: "Rose Hill",
      locality: "Rose Hill Centre 1 - Barbeau",
      postalCode: "71360",
    },
    {
      city: "Belle Rose",
      locality:
        "Belle Rose 8 - Ollier  from Royal road to Rail (southern side)",
      postalCode: "72108",
    },
    {
      city: "Belle Rose",
      locality: "Belle Rose 8 - Royal road (both sides) from Ollier to Wilson",
      postalCode: "72108",
    },
    {
      city: "Camp Levieux",
      locality: "Camp Levieux 1 - Canal ",
      postalCode: "71203",
    },
    {
      city: "Camp Levieux",
      locality: "Camp Levieux 1 - Magellan",
      postalCode: "71203",
    },
    {
      city: "Camp Levieux",
      locality:
        "Camp Levieux 2 - C.D.Garde (north side only) from Berthaud to Canal",
      postalCode: "71204",
    },
    {
      city: "Chinese Embassy",
      locality: "Chinese Embassy",
      postalCode: "72204",
    },
    {
      city: "Belle Rose",
      locality: "Belle Rose 8 - Beau Sejour ",
      postalCode: "72108",
    },
    {
      city: "Belle Rose",
      locality: "Belle Rose 9 - Wilson  south side Royal road to Colville ",
      postalCode: "72204",
    },
    {
      city: "Camp Levieux",
      locality: "Camp Levieux 1 - Cretin Lane",
      postalCode: "71203",
    },
    {
      city: "Camp Levieux",
      locality: "Camp Levieux 1 - Mamzelle",
      postalCode: "71203",
    },
    {
      city: "Camp Levieux",
      locality:
        "Camp Levieux 2 - Cretin (south side only) from Berthaud to Canal",
      postalCode: "71204",
    },
    {
      city: "Cite Corp de Garde",
      locality: "Cite Corp de Garde",
      postalCode: "71205",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - La Hausse ",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - De Caen ",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality:
        "Camp Levieux 1 - Cretin  (north side) from Berthaud  to Rue Canal",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Mariamen Temple",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Cretin lane",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Espace Concorde (C.levieux)",
      postalCode: "71207",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - G.Ythier  from Ollier to Mallefille",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality:
        "Belle Rose 9 - Royal road from Wilson  to Belle Rose (Forget) ",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - D'Argent ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Monsieur",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - E.Laval",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Abdoolah", postalCode: "71308" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Mallefille  (Royal road to Laperouse )",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Ganga Lane",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Dr Piarroux St",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Nabee ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - E.Laval lane",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Badamiers", postalCode: "71309" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Ythier ",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Maroussem Lane",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Filao",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Nubee ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - E.Laval lane 1",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Flat Bhunjun (village de la montagne)",
      postalCode: "71210",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - La Perouse  (both sides)",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Hossenally Lane",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Freddy",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Petit Montagne ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Gaya Lane",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Hollywood", postalCode: "71311" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Madhoo ",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - MSC Building",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Impasse Barbier",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Prince Charles ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Houddoul",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Monmartre", postalCode: "71312" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - R Modun ",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Islamic College",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Imp Longane",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality:
        "Camp Levieux 1 - Ratsitatane  (south side) from Berthaud  to Rue Canal",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Imp Cretin",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Pem", postalCode: "71313" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Kooraram ",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Quality Beverages",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Imp Nabee",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Surcouf ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Imp Takoor",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Flat Poupinel de Valence",
      postalCode: "71314",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Naz  from Beau Sejour  to Lapeyrouse ",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Colville East Side (no 47 to 50)",
      postalCode: "72204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Irene Street",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Tamarin Lane",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Malroux",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Robinson", postalCode: "71315" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Ghoorun Lane",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 9 - Colville West Side (no 43 to 45)",
      postalCode: "72109",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Junction Lane",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - A.L.Suddoo",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Perroud",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Flat Roches Brunes", postalCode: "71216" },
    {
      city: "Rose Hill",
      locality: "Belle Rose 7 - Mareemootoo ",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Wilson  (Colville to La Perouse) both sides",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Alphonse Lane",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - La Mare ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Assembly ",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Petit",
      postalCode: "71204",
    },
    { city: "Rose Hill", locality: "Galerie Atchia", postalCode: "71317" },
    {
      city: "Rose Hill",
      locality:
        "Belle Rose 7 - Ollier (northern side) from Royal road to Rail + lanes",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality:
        "Belle Rose 8 - Wilson  (northern side) Royal road up to Colville",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Barbier ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Longane",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Assembly Lane",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Ravinale",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 7 - Royal Road Coriolis to Ollier",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - SSS Chaperon",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Barbier Lane",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Madame",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality:
        "Camp Levieux 2 - Berthaud from C.D.Garde to Cretin (west side only)",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Sirius",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 7 - Van Nestor (Imp Georges) Lane",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 8 - Riverside Hotel",
      postalCode: "72108",
    },
    {
      city: "Rose Hill",
      locality:
        "Camp Levieux 1 - Berthaud  (west side) C.D.Garde  to Ratsitatane ",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 1 - Madras",
      postalCode: "71203",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Coombes",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Camp Levieux 2 - Surcouf",
      postalCode: "71204",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Cirne (Hammarsjold) Lane",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 5 - Stanley  (both sides) from Ollier to Boundary",
      postalCode: "72301",
    },
    { city: "Rose Hill", locality: "Arab Town", postalCode: "71301" },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Dr Ross  from Ollier to Boundary",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality:
        "Belle Rose 6 Coriolis (walk 5) - Boundary  southern side from River to Railway",
      postalCode: "72106",
    },
    { city: "Rose Hill", locality: "Arcades Reetoo", postalCode: "71302" },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Hitchick east side from Ollier to Boundary",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality:
        "Belle Rose 6 Coriolis (walk 5) - Coriolis (whole) up to last house on rail",
      postalCode: "72106",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Boundary (southern side) Rail to Murray",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Humbert Lane",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 6 Coriolis - Eden College (girls) (walk 6)",
      postalCode: "72106",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Cassidy ",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Le Conte de Lisle  Ollier to Boundary",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 6 Coriolis (walk 5) - Imp Boundary",
      postalCode: "72106",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Cretin ",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Murray western side (Boundary to Antelme)",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 6 Coriolis (walk 5) - L Koenig ",
      postalCode: "72106",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Hassen Sakir Lane",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Muslun Lane",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 7 - A Chady Lane",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Lees ",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality:
        "Beau Sejour 4 - Ollier from Hitchcock to Murray (both sides) + Lanes",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 7 - Auckloo Lane",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Murray east side (Boundary to Antelme)",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Oxford Lane",
      postalCode: "72102",
    },
    {
      city: "Rose Hill",
      locality: "Belle Rose 7 - Coodien Lane",
      postalCode: "72107",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 3 - Nuckchady Lane",
      postalCode: "72101",
    },
    {
      city: "Rose Hill",
      locality: "Beau Sejour 4 - Sauba Lane",
      postalCode: "72102",
    },
    {
      city: "Forest Side",
      locality: "Icery - Decaen (east)",
      postalCode: "74416",
    },
    {
      city: "Forest Side",
      locality: "L'Okana - L'Okana Road",
      postalCode: "74422",
    },
    {
      city: "Forest Side",
      locality: "Morc Carbonel - Swift lane",
      postalCode: "74427",
    },
    {
      city: "Forest Side",
      locality: "Residence La Colombe",
      postalCode: "74435",
    },
    {
      city: "Forest Side",
      locality: "Cite Camp Le Juge - Gust Colin (south) from Oak  to Rivulet",
      postalCode: "74406",
    },
    {
      city: "Forest Side",
      locality: "Icery - Forest Side SSS",
      postalCode: "74416",
    },
    {
      city: "Forest Side",
      locality: "Louis Pasteur - Pasteur",
      postalCode: "74423",
    },
    { city: "Forest Side", locality: "Morc Devoyenne", postalCode: "74428" },
    {
      city: "Forest Side",
      locality: "Residence Les Colonies",
      postalCode: "74436",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Derby St from G.Colin St to F.Bonnefin St",
      postalCode: "74513",
    },
    { city: "Forest Side", locality: "Icery - SBM Park", postalCode: "74416" },
    {
      city: "Forest Side",
      locality: "Louis Pasteur - Swastica",
      postalCode: "74423",
    },
    { city: "Forest Side", locality: "Morc Leclezio", postalCode: "74429" },
    {
      city: "Forest Side",
      locality: "Residence Les Jasmins",
      postalCode: "74437",
    },
    {
      city: "Forest Side",
      locality: "La Basserie (north)",
      postalCode: "74537",
    },
    {
      city: "Forest Side",
      locality: "Louis Pasteur - Ex MBC",
      postalCode: "74423",
    },
    {
      city: "Forest Side",
      locality: "Morc Piat - Meadow Lark Lane",
      postalCode: "74430",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Filling Station Rochecouste",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Basserie (south)",
      postalCode: "74445",
    },
    {
      city: "Forest Side",
      locality: "Magnolias Flats - Royal Road East from Magniola to Pasteur",
      postalCode: "74424",
    },
    {
      city: "Forest Side",
      locality: "Morc Piat - Osprey Street",
      postalCode: "74430",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Hibiscus",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - Cite Harel 1+ 2",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Maurice Martin - Maurice Martin",
      postalCode: "74425",
    },
    {
      city: "Forest Side",
      locality: "Morc Piat - Pheasant lane",
      postalCode: "74430",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Olsen",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - Bld Victoria",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Maurice Martin - Decaen",
      postalCode: "74425",
    },
    {
      city: "Forest Side",
      locality: "Morc Piat - Sand Piper lane",
      postalCode: "74430",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Hortensia",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - La Croix lane",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Barnet",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Morc Piat - Sheldrake Lane",
      postalCode: "74430",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Jasmin",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - E. Nemorin",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Barrow (Barlow)",
      postalCode: "74447",
    },
    { city: "Forest Side", locality: "Morc Pilot", postalCode: "74448" },
    {
      city: "Forest Side",
      locality: "Rochecouste - Marguerite",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - Ethnicity",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Bristol",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Daruty",
      postalCode: "74532",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Rochecouste St",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - Cure St from Nemorin to Ethnicity",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Corby",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Ramalingum - Bungsy Lane",
      postalCode: "74556",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Rochecouste Lane",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - Seeneevassen St",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Hamilton",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Ramalingum - Domur lane",
      postalCode: "74556",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Forum",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "La Croix - Seeneevassen lane",
      postalCode: "74419",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Maidstone",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Ramalingum - Cardinal Margeot Street",
      postalCode: "74556",
    },
    { city: "Forest Side", locality: "Rochecouste - NTA", postalCode: "74438" },
    { city: "Forest Side", locality: "Les Aubineaux", postalCode: "74420" },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Mayfair",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality:
        "Ramalingum - G Colin Street (North side) from Margeot to Ramalingum",
      postalCode: "74556",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Community Health centre",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "Local Govt Service Commission",
      postalCode: "74421",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Orient",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Ramalingum - Ramalingum Lane",
      postalCode: "74556",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Fire Station",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "Icery - Carosin lane",
      postalCode: "74416",
    },
    {
      city: "Forest Side",
      locality: "L'Okana - Impasse Maurel",
      postalCode: "74422",
    },
    {
      city: "Forest Side",
      locality: "Morc Antelme - Stafford",
      postalCode: "74447",
    },
    {
      city: "Forest Side",
      locality: "Public Service Commission",
      postalCode: "74434",
    },
    {
      city: "Forest Side",
      locality: "Rochecouste - Decaen west",
      postalCode: "74438",
    },
    {
      city: "Forest Side",
      locality: "Camp Lagesse - Camp Lagesse Lane",
      postalCode: "74402",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Royal Road from Fire Stn to Pasteur",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - Edison Street",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Chandrayah lane",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Camp Lagesse - Derby St South (from G Colin to C Lagesse)",
      postalCode: "74402",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - Daffodil St",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - Ingersol Street",
      postalCode: "74508",
    },
    { city: "Forest Side", locality: "Flat Ramdenee", postalCode: "74512" },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Dr H. Robert St (south)",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Camp Lagesse - G Duval St from Melish to C Lagesse Lane",
      postalCode: "74402",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - Greenwood ",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - St.F",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - G.Froppier (east) from G.Colin to G.Bestel",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality:
        "Forst-Side 2 - Frederic Bonnefin Street from Froppier to Joachim",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Camp Lagesse - Lagesse Lane",
      postalCode: "74402",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - Gust Colin (south) from Ampere St to street F",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - St.G",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Gust Bestel Street",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - G.Froppier (west) from Colin to H.Robert",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Camp Lagesse - Melish St",
      postalCode: "74402",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - J.S Rennie St",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality: "Cite La Brasserie - Bach Lane",
      postalCode: "74409",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Impasse Derby",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality:
        "Forst-Side 2 - G.Colin Street from Margeot to Froppier (north side)",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Camp Le Juge - Bakurally St",
      postalCode: "74403",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - Jean XX1 ",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality: "Cite La Brasserie - Chopin Lane",
      postalCode: "74409",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Mercury lane",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Haut plateau Lane (from H.Robert to Darwin)",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Camp Le Juge - Camp le Juge St",
      postalCode: "74403",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - Street F",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality:
        "Cite La Brasserie - La Brasserie Rd (south) of Cite La Brasserie",
      postalCode: "74409",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Netupe lane",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Impasse Benoit",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Acajou Lane",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Atlee - Street G",
      postalCode: "74405",
    },
    {
      city: "Forest Side",
      locality: "Cite La Brasserie - Mozart lane",
      postalCode: "74409",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Impasse Goranah",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Impasse G.Bestel",
      postalCode: "74514",
    },
    { city: "Forest Side", locality: "Celicourt Antelme", postalCode: "74444" },
    {
      city: "Forest Side",
      locality: "Cite Camp Le Juge - Gust Colin (south) from Oak  to Rivulet",
      postalCode: "74406",
    },
    {
      city: "Forest Side",
      locality: "Cite La Brasserie - Schubert lane",
      postalCode: "74409",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Bonnefin St from Royal Rd to G.Froppier St",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Impasse Loumeau",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Finch Lane (Imp Raffray)",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Camp Le Juge - Ebony",
      postalCode: "74406",
    },
    {
      city: "Forest Side",
      locality: "Cite La Brasserie - Strauss lane",
      postalCode: "74409",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Camp Franky (Garda) lane",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 3 - Maabar Lane",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Garage UBS",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Camp Le Juge - Oaks",
      postalCode: "74406",
    },
    {
      city: "Forest Side",
      locality: "Cite St Luc - Bambous lane",
      postalCode: "74410",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Mahogany lane",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 4 - Morc Laurent lane",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Impasse Bissessur",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - Ampere Street",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Cite St Luc - Cactus lane",
      postalCode: "74410",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - S.Pydiah St",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 5 - Poivre Street",
      postalCode: "74514",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Imperial College",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - Blakett St.",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Cite St Luc - Goyaviers lane",
      postalCode: "74410",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - G.Colin north from Roya Rd to Froppier",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Henri Robert-north (WARD 2)",
      postalCode: "74215",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Marygold St",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - Curie Street",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Cite St Luc - Rnal lane",
      postalCode: "74410",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 1 - Royal Rd from G. Colin St to Le Printemps",
      postalCode: "74513",
    },
    {
      city: "Forest Side",
      locality: "Icery - 3 Filling Stations (La Vigie)",
      postalCode: "74416",
    },
    {
      city: "Forest Side",
      locality: "Camp Bombay - Dr Bour St",
      postalCode: "74401",
    },
    {
      city: "Forest Side",
      locality: "Celicourt Antelme - Orchidee",
      postalCode: "74444",
    },
    {
      city: "Forest Side",
      locality: "Cite Joachim - Darwin Street",
      postalCode: "74508",
    },
    {
      city: "Forest Side",
      locality: "Cite St Luc - Sapins lane",
      postalCode: "74410",
    },
    {
      city: "Forest Side",
      locality: "Forst-Side 2 - Appanah lane",
      postalCode: "74514",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Pelicans",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Nandous",
      postalCode: "72256",
    },
    { city: "Quatre Bornes", locality: "Trianon", postalCode: "72257" },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Aigles",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Pigeons",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Trianon Shopping Centre",
      postalCode: "72258",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Allouettes",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Pinsons",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Victoria Hospital",
      postalCode: "72259",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Autruches",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Roitelets",
      postalCode: "72256",
    },
    { city: "Quatre Bornes", locality: "Morc Mio", postalCode: "72560" },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Becasses",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Tulipes",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Flat River Islands",
      postalCode: "72265",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Bengalis",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  du Cardinal",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Canards",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Hillcrest ",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Colombes",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Impasse des Ibis",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Eperviers",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Impasse Hirondelles",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Residence D'Epinay",
      postalCode: "72254",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Flammants",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Loriots ",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Residence Trianon (delivery by Phoenix P.O)",
      postalCode: "72260",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Geais",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Perdrix ",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Renganaden Seeneevassen ",
      postalCode: "72455",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Hirondelles",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Roitelets ",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Dodos",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Ibis",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Rossignol ",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Faucons",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Kiwis",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Sodnac  (both sides)",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Fauvettes",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Moineaux",
      postalCode: "72256",
    },
    { city: "Quatre Bornes", locality: "Sodnac SSS", postalCode: "72256" },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Tourterelles",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac -  des Mouettes",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Sodnac - Toucan ",
      postalCode: "72256",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Duperre ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality:
        "Quatre Bornes 2 - Sir Guy Forget from B.D.St Pierre  to Victoria ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Duperre ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Sir C. Antelme ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Meredac ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Ernest Harel St",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality:
        "Quatre Bornes 2 - Sir Naz  (south) Side from Hitchcock to Berthaud",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Einstein ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality:
        "Quatre Bornes 3 - Sir V vaz (north) from Berthaud to Hitchcock",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Police Station",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Fleming ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Stanley ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Farquhar  from Naz to Ollier",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Stanley ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Ramsamy lane",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Farquhar  from Victoria to Naz",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Stanley lane",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Hitchcock  (west) from Ollier to Naz",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Stanley  from Naz to Ollier",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Reservoir lane",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Gladstone  (from Stanley  to Hitchcock )",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - St. Andrews Church",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Imp St Esprit",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Stylet ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Sir S. Ramgoolam  (both sides)",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Hitchcock (west) from Victoria to S.V.Naz",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - St. Esprit College",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Imp.Antelme",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality:
        "Quatre Bornes 4 - Boundary (south) from Berthaud to Dawtal Lane",
      postalCode: "72352",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Sir W. Newton ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Imp. Kistnen",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality:
        "Quatre Bornes 2 - St. Jean Rd (North Side) Victoria to Berthaud ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Jenner St",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 4 - Berthaud  (east) from Ollier to Boundary",
      postalCode: "72352",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - T. D'Avice ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Imp. Victoria",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - St. Rosaire Church",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Leclezio ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 4 - Boundary Rd",
      postalCode: "72352",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Tritan D'Avice ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Labourdonnais ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Stevenson ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Louvet ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 4 - Dawtal lane",
      postalCode: "72352",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Wellington ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - L. Nellan Govt. School",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Surcouf ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Moussa Lane",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 4 - Farquhar lane",
      postalCode: "72352",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - L.L'homme ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Tee Koung Lane",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Ollier  (south) from Berthaud  to Hitchcock",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 4 - Robert E Hart from Dawtal Lane to Berthaud",
      postalCode: "72352",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Berthaud lane",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - La Forge lane",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality:
        "Quatre Bornes 2 - Victoria (west side) from St Jean to Hitchcock",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Ollier Lane",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - B. Sequard ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Bouvet ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Loreto Convent College",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Willoughby ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Ollier lane no.1",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Candos lane",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Bruce ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Odette Ernest ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - A. Brown ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Ollier lane no.2",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Cossigny ",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Conservatoire F. Mitterand",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Seeboo lane",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Balgobin ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - R. Ollier ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - E. Rochecouste Govt. School",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Darwin ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 2 - Mgr Murphy ",
      postalCode: "72350",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - Berthaud  (East) from Remy Ollier to Naz",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 3 - S. Gaya ",
      postalCode: "72351",
    },
    {
      city: "Quatre Bornes",
      locality: "Quatre Bornes 5 - Malartic lane",
      postalCode: "72253",
    },
    {
      city: "Quatre Bornes",
      locality: "Nehru Road (from Kingstone  to Kalimaye Rd)",
      postalCode: "72539",
    },
    {
      city: "Paillotte (West)",
      locality: "Callychurn Lane",
      postalCode: "73360",
    },
    {
      city: "Palma 1",
      locality: "Laseringue  (eastern side)",
      postalCode: "72444",
    },
    { city: "Palma Junction", locality: "Palma Junction", postalCode: "72546" },
    {
      city: "Quatre Bornes 1",
      locality: "Gaetan Raynal S.S.S",
      postalCode: "72249",
    },
    { city: "N H D C Palm", locality: "N H D C Palm", postalCode: "72440" },
    {
      city: "Paillotte (West)",
      locality: "Candos Lane West",
      postalCode: "73360",
    },
    { city: "Palma 1", locality: "M. Beekharry lane", postalCode: "72444" },
    { city: "Pellegrin", locality: "Pellegrin", postalCode: "72247" },
    { city: "Quatre Bornes 1", locality: "Henessy ", postalCode: "72249" },
    {
      city: "N H D C Villeneuve",
      locality: "N H D C Villeneuve",
      postalCode: "72241",
    },
    { city: "Paillotte (West)", locality: "Dawoo Lane", postalCode: "73360" },
    {
      city: "Palma 1",
      locality: "Palma Rd (south) from Cremation  to Round About",
      postalCode: "72444",
    },
    { city: "Pierrefonds", locality: "Pierrefonds", postalCode: "72248" },
    { city: "Quatre Bornes 1", locality: "Henessy lane", postalCode: "72249" },
    { city: "Quatre Bornes", locality: "Orchard Centre", postalCode: "72242" },
    { city: "Paillotte (West)", locality: "Jugnoo lane", postalCode: "73360" },
    { city: "Palma 1", locality: "Pandeea lane", postalCode: "72444" },
    {
      city: "Quatre Bornes",
      locality: "Telfair  (west side) from St. Jean Road to Forget ",
      postalCode: "72249",
    },
    { city: "Quatre Bornes", locality: "Osman ", postalCode: "72249" },
    { city: "Quatre Bornes", locality: "Orchard Tower", postalCode: "72243" },
    {
      city: "Paillotte (West)",
      locality: "Kalimaye lane",
      postalCode: "73360",
    },
    { city: "Palma 1", locality: "R. Rughooputh ", postalCode: "72444" },
    {
      city: "Quatre Bornes",
      locality: "St. Jean Rd (north side) from Telfair St to Victoria ",
      postalCode: "72249",
    },
    { city: "Quatre Bornes", locality: "P. Henri ", postalCode: "72249" },
    { city: "Paillotte (East)", locality: "Bambous Rd", postalCode: "73452" },
    {
      city: "Paillotte (West)",
      locality: "Ragoo Lane up to Verna Lane",
      postalCode: "73360",
    },
    { city: "Palma 1", locality: "Sowamber ", postalCode: "72444" },
    {
      city: "Quatre Bornes",
      locality: "Forget Rd (southern side) from Telfair St to Buswell St",
      postalCode: "72249",
    },
    { city: "Quatre Bornes", locality: "Post-Office", postalCode: "72249" },
    { city: "Paillotte (East)", locality: "Bandhoo Rd", postalCode: "73452" },
    {
      city: "Paillotte (West)",
      locality: "Ramdhonee Lane",
      postalCode: "73360",
    },
    {
      city: "Palma 2",
      locality: "J. Nehru (north) from Kalimaye Rd to Riviere Papayes",
      postalCode: "72445",
    },
    {
      city: "Quatre Bornes",
      locality: "Doyen  (west side) from Forget to V. Naaz",
      postalCode: "72249",
    },
    { city: "Quatre Bornes", locality: "Tagore ", postalCode: "72249" },
    { city: "Paillotte (East)", locality: "Boojhoo Rd", postalCode: "73452" },
    {
      city: "Paillotte (West)",
      locality: "Royal Rd (western side) from Candos Lane west to Vostok",
      postalCode: "73360",
    },
    {
      city: "Palma 2",
      locality: "Kalimaye Rd (west) from J.Nehru to Chemin Machine",
      postalCode: "72445",
    },
    {
      city: "Quatre Bornes",
      locality: "Victoria  (east side) from V. Naaz to St. Jean Rd",
      postalCode: "72249",
    },
    { city: "Quatre Bornes", locality: "Town Hall", postalCode: "72249" },
    {
      city: "Paillotte (East)",
      locality: "Cypres lane 1",
      postalCode: "73452",
    },
    { city: "Paillotte (West)", locality: "Soobul Lane", postalCode: "73360" },
    {
      city: "Palma 2",
      locality: "Chemin Machine (north) from Kalimaye Rd to Palma Rd",
      postalCode: "72445",
    },
    { city: "Quatre Bornes", locality: "Bus Terminal", postalCode: "72249" },
    { city: "Quatre Bornes", locality: "Baissac ", postalCode: "72350" },
    {
      city: "Morc Saint Jean",
      locality: "Dr. Delaitre ",
      postalCode: "72238",
    },
    {
      city: "Paillotte (East)",
      locality: "Cypres lane 2",
      postalCode: "73452",
    },
    { city: "Palma 1", locality: "Bissessur ", postalCode: "72444" },
    {
      city: "Palma 2",
      locality:
        "Palma Rd (south) from Chemin Machine to Pierrefonds Round About",
      postalCode: "72445",
    },
    { city: "Quatre Bornes", locality: "Buswell ", postalCode: "72249" },
    {
      city: "Quatre Bornes",
      locality: "Bernandin De St. Pierre",
      postalCode: "72350",
    },
    {
      city: "Morc Saint Jean",
      locality: "Jacinthes ",
      postalCode: "72238",
    },
    {
      city: "Paillotte (East)",
      locality: "Lall Bahadur Shastri (southern side)",
      postalCode: "73452",
    },
    { city: "Palma 1", locality: "Canal ", postalCode: "72444" },
    { city: "Palma 2", locality: "Jeewoonarain ", postalCode: "72445" },
    { city: "Quatre Bornes", locality: "C. Dunant ", postalCode: "72249" },
    {
      city: "Quatre Bornes",
      locality: "Berthaud (east) from St Jean Rd to S.V.Naz",
      postalCode: "72350",
    },
    {
      city: "Morc Saint Jean",
      locality: "St Jean Rd (south) from Tulipes to Girofliers",
      postalCode: "72238",
    },
    {
      city: "Paillotte (East)",
      locality: "Ramburrun Lane",
      postalCode: "73452",
    },
    { city: "Palma 1", locality: "Charlie ", postalCode: "72444" },
    { city: "Quatre Bornes", locality: "Jugnauth Lane", postalCode: "72445" },
    { city: "Quatre Bornes", locality: "C. Hall ", postalCode: "72249" },
    {
      city: "Morc Saint Jean",
      locality:
        "S. Seewoosagur Ramgoolam  (both sides) from Newton to Trunk Rd",
      postalCode: "72238",
    },
    {
      city: "Paillotte (East)",
      locality: "Royal Rd (eastern side) from Shastri Rd to Sonie Rd",
      postalCode: "73452",
    },
    {
      city: "Palma 1",
      locality: "Cremation  (whole)",
      postalCode: "72444",
    },
    { city: "Palma 2", locality: "St Brigitte ", postalCode: "72445" },
    { city: "Quatre Bornes", locality: "Commerson ", postalCode: "72249" },
    {
      city: "Morc Saint Jean",
      locality: "Trianon  No. 1",
      postalCode: "72238",
    },
    { city: "Paillotte (East)", locality: "Sumoondar Rd", postalCode: "73452" },
    {
      city: "Palma 1",
      locality: "Cremation lane (from Cremation  to Palma Rd)",
      postalCode: "72444",
    },
    { city: "Palma 2", locality: "St Brigitte Church", postalCode: "72445" },
    { city: "Quatre Bornes", locality: "D'Epinay ", postalCode: "72249" },
    {
      city: "Morc Saint Jean",
      locality: "Trianon  No. 2",
      postalCode: "72238",
    },
    { city: "Paillotte (East)", locality: "Sumputh Rd", postalCode: "73452" },
    { city: "Palma 1", locality: "Eucalyptus lane", postalCode: "72444" },
    { city: "Palma 2", locality: "Cheshire Home", postalCode: "72445" },
    { city: "Quatre Bornes", locality: "D'Hotman ", postalCode: "72249" },
    {
      city: "Morc Saint Jean",
      locality: "Ylang Ylang ",
      postalCode: "72238",
    },
    { city: "Paillotte (West)", locality: "Augum lane", postalCode: "73360" },
    { city: "Palma 1", locality: "Gangadar ", postalCode: "72444" },
    { city: "Palma 2", locality: "Lawat lane", postalCode: "72445" },
    { city: "Quatre Bornes", locality: "Fareed ", postalCode: "72249" },
    {
      city: "La Louise",
      locality: "Royal Rd (east) from S.S.Ramgoolam to Cossigny",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Carnation lane", postalCode: "72427" },
    {
      city: "La Source",
      locality: "Northern Boundary Rd (west) From Murugan to Berthaud",
      postalCode: "72427",
    },
    { city: "Les Halles", locality: "", postalCode: "72264" },
    {
      city: "Morc Saint Jean",
      locality: " des Lataniers",
      postalCode: "72238",
    },
    {
      city: "Cite Saint Jean",
      locality: "Saint Jean Rd (south) from Tulipes to Azalees",
      postalCode: "72218",
    },
    {
      city: "La Louise",
      locality: "S.H.Blood (north) from Royal Rd to Kingstone",
      postalCode: "72326",
    },
    {
      city: "La Source",
      locality: "Cremation Lane (from Cremation  to Puspass)",
      postalCode: "72427",
    },
    { city: "La Source", locality: "Orange Lane", postalCode: "72427" },
    { city: "Morc Cerisier", locality: "", postalCode: "72529" },
    {
      city: "Morc Saint Jean",
      locality: " des Longaniers",
      postalCode: "72238",
    },
    { city: "Dreamton Park", locality: "", postalCode: "72219" },
    {
      city: "La Louise",
      locality: "Kingstone (east) from H.Blood to Nehru",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Dansant Lane", postalCode: "72427" },
    {
      city: "La Source",
      locality: "Palma Rd (north) from West Boundary to Seeneevassen",
      postalCode: "72427",
    },
    {
      city: "Morc Dookun 1 (Mun of Q.Bornes)",
      locality: "",
      postalCode: "72530",
    },
    {
      city: "Morc Saint Jean",
      locality: " des Manguiers",
      postalCode: "72238",
    },
    { city: "Emerald Park (Residence)", locality: "", postalCode: "72222" },
    {
      city: "La Louise",
      locality: "Nehru Rd (south) from Kingstone to Western Boundary",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Filao Lane", postalCode: "72427" },
    { city: "La Source", locality: "Puspass Lane", postalCode: "72427" },
    {
      city: "Morc Dookun 2 (Mun of Vac/Phoenix)",
      locality: "",
      postalCode: "73361",
    },
    {
      city: "Morc Saint Jean",
      locality: " des Orchidees",
      postalCode: "72238",
    },
    { city: "Emerald Park Centre", locality: "", postalCode: "72262" },
    {
      city: "La Louise",
      locality: "Nehru Rd (both sides) from Candos Rd to Western Boundary",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Gangama Lane", postalCode: "72427" },
    { city: "La Source", locality: "Puspass ", postalCode: "72427" },
    {
      city: "Ebene Views (after river inc Baden Powell house)",
      locality: "",
      postalCode: "72231",
    },
    {
      city: "Morc Saint Jean",
      locality: " des Palmiers",
      postalCode: "72238",
    },
    { city: "La Colline Commercial Centre", locality: "", postalCode: "72224" },
    { city: "Quatre Bornes", locality: "Pillay lane", postalCode: "72326" },
    { city: "La Source", locality: "Gopal Lane", postalCode: "72427" },
    { city: "La Source", locality: "Rajcoomar ", postalCode: "72427" },
    { city: "Morc Medine", locality: "", postalCode: "72533" },
    {
      city: "Morc Saint Jean",
      locality: " des Rosiers",
      postalCode: "72238",
    },
    { city: "La Ferme", locality: "", postalCode: "72425" },
    { city: "La Louise", locality: "Liston ", postalCode: "72326" },
    { city: "La Source", locality: "Grassy Lane", postalCode: "72427" },
    { city: "La Source", locality: "Rotin lane", postalCode: "72427" },
    { city: "Morc Nuckcheddy", locality: "", postalCode: "72534" },
    {
      city: "Morc Saint Jean",
      locality: " des Talipots",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "Western Boundary (east) from Nehru Rd to Northern Boundary",
      postalCode: "72326",
    },
    { city: "La Louise", locality: "R.Rivet ", postalCode: "72326" },
    { city: "La Source", locality: "Imp. Cocotier", postalCode: "72427" },
    { city: "La Source", locality: "Rotin lane 2", postalCode: "72427" },
    { city: "Morc Pierrefonds", locality: "", postalCode: "72435" },
    {
      city: "Morc Saint Jean",
      locality: " des Tulipes",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "Northern Boundary (south)",
      postalCode: "72326",
    },
    { city: "La Louise", locality: "Beaugeard ", postalCode: "72326" },
    { city: "La Source", locality: "Imp. Fuguier", postalCode: "72427" },
    { city: "La Source", locality: "Rotin lane 3", postalCode: "72427" },
    { city: "Morc Poonith", locality: "", postalCode: "72436" },
    {
      city: "Morc Saint Jean",
      locality: "Belcourt ",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality:
        "Berthaud (west) from Northern Boundary to La Croisee La Louise",
      postalCode: "72326",
    },
    {
      city: "La Louise",
      locality: "Fraternite  from Kingstone to Royal Rd",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Imp. Hibiscus", postalCode: "72427" },
    {
      city: "La Source",
      locality: "S. V. Murugan  from Northern Boundary to Seeneevassen",
      postalCode: "72427",
    },
    { city: "Morc Riverside", locality: "", postalCode: "72537" },
    {
      city: "La Louise",
      locality: "St Jean (south) from La Croisee La Louise to Bigaignon",
      postalCode: "72326",
    },
    { city: "La Louise", locality: "La Louise ", postalCode: "72326" },
    { city: "La Source", locality: "Jaylall ", postalCode: "72427" },
    {
      city: "La Source",
      locality: "S.V.Murugan  (west) from Palma Rd to Northern Boundary",
      postalCode: "72427",
    },
    {
      city: "Morc Saint Jean",
      locality: " des Azalees",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "Wellington  (south) from Bigaignon to T D'Avice",
      postalCode: "72326",
    },
    { city: "La Louise", locality: "Louis Nellan lane", postalCode: "72326" },
    { city: "La Source", locality: "Kalimaye lane", postalCode: "72427" },
    { city: "La Source", locality: "Selvin Lane", postalCode: "72427" },
    {
      city: "Morc Saint Jean",
      locality: " des Capucines",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "Tristan D'Avice (west) from Wellington to Cossigny",
      postalCode: "72326",
    },
    {
      city: "La Louise",
      locality: "Royal Rd from H.Blood to Croisee La Louise",
      postalCode: "72326",
    },
    { city: "La Source", locality: "La Source ", postalCode: "72427" },
    {
      city: "La Source",
      locality: "Temple Lane (C D Garde Lane)",
      postalCode: "72427",
    },
    {
      city: "Morc Saint Jean",
      locality: " des Girofliers",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "Cossigny (north) from T.D'Avice to Candos Lane",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Auchaybar Lane", postalCode: "72427" },
    { city: "La Source", locality: "Lilloo lane", postalCode: "72427" },
    { city: "La Source", locality: "Western Boundary", postalCode: "72427" },
    {
      city: "Morc Saint Jean",
      locality: " des Glaieuls",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "Candos lane (west) from Cossigny to S.S. Ramgoolam",
      postalCode: "72326",
    },
    { city: "La Source", locality: "Bagonias lane", postalCode: "72427" },
    { city: "La Source", locality: "Morc. Coombes", postalCode: "72427" },
    {
      city: "Le Merit (delivery by Phoenix P.O)",
      locality: "",
      postalCode: "72228",
    },
    {
      city: "Morc Saint Jean",
      locality: " des Goyaviers",
      postalCode: "72238",
    },
    {
      city: "La Louise",
      locality: "S.S. Ramgoolam (north) from Candos lane to Royal Rd",
      postalCode: "72326",
    },
    {
      city: "La Source",
      locality: "Berthaud (west) from North Boundary to Boundary ",
      postalCode: "72427",
    },
    { city: "La Source", locality: "Morc. Coombes", postalCode: "72427" },
    { city: "Le Merit 2 (near Pellegrin)", locality: "", postalCode: "72263" },
    {
      city: "Morc Saint Jean",
      locality: " des Jacarandas",
      postalCode: "72238",
    },
    {
      city: "Beau Sejour 2",
      locality: "Conte de Lisle  from Victoria to R.Ollier",
      postalCode: "72104",
    },
    {
      city: "Belle Rose 4",
      locality: "Orphelinat Bon Secours",
      postalCode: "72208",
    },
    {
      city: "Belle Rose 5",
      locality: "Sir V.Naz  (south) from Lapeyrouse  to G.Ythier ",
      postalCode: "72109",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Boundary (south) from R.E.Hart to Dawtall Lane",
      postalCode: "72313",
    },
    {
      city: "Cite Candos/Residence",
      locality: "La Paix  from Royal Rd to Kingstone",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "La paix  (north) from Kinstone  to Seechurn ",
      postalCode: "72515",
    },
    {
      city: "Cite Saint Jean",
      locality: " Talipots (north) From Azalees to Tulipes",
      postalCode: "72218",
    },
    {
      city: "Beau Sejour 2",
      locality: "Dr Ross  from Ollier to Naz",
      postalCode: "72104",
    },
    {
      city: "Belle Rose 4",
      locality: "Royal Rd from St Jean Church to Guy Forget ",
      postalCode: "72208",
    },
    {
      city: "Belle Rose 5",
      locality: "St Jean  (north) from Telfair  to St Jean Church",
      postalCode: "72109",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Dawtall Lane (East) from Boundary to R.E.Hart ",
      postalCode: "72313",
    },
    {
      city: "Cite Candos/Residence",
      locality: "Lavoipierre ",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "L'nir ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 2",
      locality: "Gladstone  from Ollier to Hitchcock",
      postalCode: "72104",
    },
    { city: "Belle Rose 4", locality: "St. Jean Church", postalCode: "72208" },
    {
      city: "Belle Rose 5",
      locality: "Telfair  (east) from St Jean  to Guy Forget",
      postalCode: "72109",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "R.E.Hart  (north part) from Dawtall lane to Rev Lebrun",
      postalCode: "72313",
    },
    {
      city: "Cite Candos/Residence",
      locality: "Mazery ",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "L'Union ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 2",
      locality: "Hitchcock  (east) from Victoria to R.Ollier ",
      postalCode: "72104",
    },
    { city: "Belle Rose 4", locality: "St. Louis ", postalCode: "72208" },
    {
      city: "Belle Rose 5",
      locality: "Telfair  from Guy Forget to Mallefille",
      postalCode: "72109",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Rev Lebrun (west) from R.E.Hart to Boundary",
      postalCode: "72313",
    },
    {
      city: "Cite Candos/Residence",
      locality: "Royal Rd (west) from La Paix to H. Blood",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Patrie ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 2",
      locality: "Murray  from Naz to C. Antelme ",
      postalCode: "72104",
    },
    { city: "Belle Rose 5", locality: " Belle Rose", postalCode: "72109" },
    {
      city: "Belle Rose 5",
      locality: "Wilson  from Lapeyrouse to Draper",
      postalCode: "72109",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Crecelles",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Concorde ",
      postalCode: "72515",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "R.E.Hart ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 2",
      locality: "Naz  from Victoria to Hitchcock",
      postalCode: "72104",
    },
    {
      city: "Belle Rose 5",
      locality: "Broad  from Surath  to Colville ",
      postalCode: "72109",
    },
    {
      city: "Boundary",
      locality: "Boundary (south) from Boundary Lane to Farquhar",
      postalCode: "72310",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Tourterelles",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Confiance ",
      postalCode: "72515",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "S.H.Blood  from Kingstone  to L'Esperance ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 2",
      locality: "Pavillon Sports Complex",
      postalCode: "72104",
    },
    {
      city: "Belle Rose 5",
      locality: "Colville  (west) from Broad  to Wilson ",
      postalCode: "72109",
    },
    { city: "Boundary", locality: "Farquhar Lane", postalCode: "72310" },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Paille en queue",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Dignite ",
      postalCode: "72515",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Seechurn  (east) from  Fraternite to La paix ",
      postalCode: "72515",
    },
    { city: "Beau Sejour 2", locality: "R. Giraud ", postalCode: "72104" },
    {
      city: "Belle Rose 5",
      locality: "De La Faye Streen",
      postalCode: "72109",
    },
    {
      city: "Boundary",
      locality: "Farquhar ( east) from Boundary to Ollier",
      postalCode: "72310",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Conde",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Dr Iqbal ",
      postalCode: "72515",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Tolerance ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 2",
      locality: "Victoria (west) from Hitchcock to Ollier ",
      postalCode: "72104",
    },
    { city: "Belle Rose 5", locality: "Domun lane", postalCode: "72109" },
    { city: "Boundary", locality: "Imp Ollier", postalCode: "72310" },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Cardinal",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Dr Riviere ",
      postalCode: "72515",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Travail ",
      postalCode: "72515",
    },
    {
      city: "Beau Sejour 1",
      locality: "Telfair  from Naz  to Mallefille",
      postalCode: "72103",
    },
    {
      city: "Belle Rose 4",
      locality: "Belle Rose RCA School",
      postalCode: "72208",
    },
    {
      city: "Belle Rose 5",
      locality: "Doyen  (east) from Naz to Guy Forget",
      postalCode: "72109",
    },
    {
      city: "Boundary",
      locality: "Ollier (north) from Stanley  to Farquhar",
      postalCode: "72310",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Nelson Mandela",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Dumas ",
      postalCode: "72515",
    },
    { city: "Cite Pere Laval", locality: "Anime ", postalCode: "72317" },
    {
      city: "Beau Sejour 1",
      locality: "Draper  from Naz to Lapeyrouse",
      postalCode: "72103",
    },
    {
      city: "Belle Rose 4",
      locality: "Broad  from Royal Rd to Colville ",
      postalCode: "72208",
    },
    { city: "Belle Rose 5", locality: "Draper ", postalCode: "72109" },
    { city: "Candos", locality: "Candos Lane East", postalCode: "72211" },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "R.E.Hart Lane",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Esperance ",
      postalCode: "72515",
    },
    { city: "Cite Pere Laval", locality: "Rajkumar ", postalCode: "72317" },
    {
      city: "Beau Sejour 1",
      locality: "G.Ythier from Naz  to Malfille ",
      postalCode: "72103",
    },
    {
      city: "Belle Rose 4",
      locality: "Colville  (east) from Broad  to Decaen ",
      postalCode: "72208",
    },
    {
      city: "Belle Rose 5",
      locality: "Guy Forget (B Rose ) from Telfair  to Colville ",
      postalCode: "72109",
    },
    {
      city: "Candos",
      locality: "Lall Bahadur Shastri (north)",
      postalCode: "72211",
    },
    {
      city: "Cite Beau Sejour/Residence",
      locality: "Lebrun lane",
      postalCode: "72313",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Fraternite  (south) from Kingstone  to Seechurn ",
      postalCode: "72515",
    },
    {
      city: "Cite Pere Laval",
      locality: "G. Rozemont ",
      postalCode: "72317",
    },
    {
      city: "Beau Sejour 1",
      locality: "Rosy Lememe Home",
      postalCode: "72103",
    },
    {
      city: "Belle Rose 4",
      locality: "Guy Forget (B Rose ) from Royal to Colville",
      postalCode: "72208",
    },
    {
      city: "Belle Rose 5",
      locality: "Guy Forget (northern side) from Telfair  to Doyen ",
      postalCode: "72109",
    },
    { city: "Cite Bassin", locality: "Apolonia Lane", postalCode: "72512" },
    {
      city: "Cite Candos/Residence",
      locality: "Chaperon ",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Gandhi ",
      postalCode: "72515",
    },
    {
      city: "Cite Pere Laval",
      locality: "Rev Lebrun Lane (east side)",
      postalCode: "72317",
    },
    { city: "Beau Sejour 1", locality: "Telfair ", postalCode: "72103" },
    { city: "Belle Rose 4", locality: "Harrow lane", postalCode: "72208" },
    {
      city: "Belle Rose 5",
      locality: "Mallefille  from Lapeyrouse  to Doyen ",
      postalCode: "72109",
    },
    { city: "Cite Bassin", locality: "Arobi Lane", postalCode: "72512" },
    {
      city: "Cite Candos/Residence",
      locality: "Colin ",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Independence ",
      postalCode: "72515",
    },
    {
      city: "Cite Pere Laval",
      locality: "Boundary (south) from Farquhar to Rev Lebrun",
      postalCode: "72317",
    },
    {
      city: "Beau Sejour 1",
      locality: "Sir V.Naz  (north) from Lapeyrouse  to G.Ythier ",
      postalCode: "72103",
    },
    { city: "Belle Rose 4", locality: "Harry lane", postalCode: "72208" },
    { city: "Belle Rose 5", locality: "St Jean Cemetary", postalCode: "72109" },
    { city: "Cite Bassin", locality: "Kumar Lane", postalCode: "72512" },
    {
      city: "Cite Candos/Residence",
      locality: "H.Blood (south) from Kinstone to Royal Rd",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: "Kingstone (west) from Fraternite  to La Paix ",
      postalCode: "72515",
    },
    {
      city: "Cite Saint Jean",
      locality: " des Tulipes (west part) from  Talipots to St Jean Rd",
      postalCode: "72218",
    },
    {
      city: "Beau Sejour 2",
      locality: "C.Antelme  from Victoria to Hitchcock",
      postalCode: "72104",
    },
    { city: "Belle Rose 4", locality: "Jerningham ", postalCode: "72208" },
    { city: "Belle Rose 5", locality: "Poivre St", postalCode: "72109" },
    { city: "Cite Bassin", locality: "Tiraka Lane", postalCode: "72512" },
    {
      city: "Cite Candos/Residence",
      locality: "Kingstone (east) from La Paix to H. Blood",
      postalCode: "72314",
    },
    {
      city: "Cite Kennedy/Residence",
      locality: 'L"Egalite ',
      postalCode: "72515",
    },
    {
      city: "Cite Saint Jean",
      locality: " des Azalees (east part) from  Talipots to St Jean Rd",
      postalCode: "72218",
    },
    { city: "Bassin/Palma", locality: " Trotter", postalCode: "72501" },
    { city: "Jackson ", locality: "Karooa ", postalCode: "72523" },
    { city: "Palma Junction", locality: "Seetloo ", postalCode: "72546" },
    { city: "Bassin/Palma", locality: "Bapamah lane", postalCode: "72501" },
    { city: "Jackson ", locality: "Koosseeal lane", postalCode: "72523" },
    { city: "Palma Junction", locality: "Shakti lane", postalCode: "72546" },
    { city: "Bassin/Palma", locality: "Bassin Rd", postalCode: "72501" },
    { city: "Jackson ", locality: "Kowlessur lane", postalCode: "72523" },
    { city: "Palma Junction", locality: "Toolsee lane", postalCode: "72546" },
    { city: "Bassin/Palma", locality: "Bassin lane 1", postalCode: "72501" },
    { city: "Jackson ", locality: "Lotus lane", postalCode: "72523" },
    { city: "Bassin SE", locality: "", postalCode: "72502" },
    { city: "Bassin/Palma", locality: "Casquette lane", postalCode: "72501" },
    { city: "Jackson ", locality: "Manick lane", postalCode: "72523" },
    { city: "Beau Sejour 1", locality: "Sir V.Naz ", postalCode: "72103" },
    {
      city: "Bassin/Palma",
      locality: "Chooroomoonee lane",
      postalCode: "72501",
    },
    { city: "Jackson ", locality: "Mere Theresa ", postalCode: "72523" },
    { city: "Beau Sejour 1", locality: "G. Ithier ", postalCode: "72103" },
    { city: "Bassin/Palma", locality: "Cooperative lane", postalCode: "72501" },
    { city: "Jackson ", locality: "Naiko lane", postalCode: "72523" },
    {
      city: "Beau Sejour 1",
      locality: "Mallefille lane 1",
      postalCode: "72103",
    },
    { city: "Bassin/Palma", locality: "La Paix ", postalCode: "72501" },
    {
      city: "Jackson ",
      locality: "Nehru Rd (both sides from Kingstone to Kalimaye Rd)",
      postalCode: "72523",
    },
    {
      city: "Beau Sejour 1",
      locality: "Malefille lane 2",
      postalCode: "72103",
    },
    { city: "Bassin/Palma", locality: "Felico lane", postalCode: "72501" },
    {
      city: "Jackson ",
      locality: "Nehru Rd (north side from Kingstone to Western Boundary)",
      postalCode: "72523",
    },
    {
      city: "Beau Sejour 1",
      locality: "Sir V.Naz  (north) from Doyen to D'Epinay",
      postalCode: "72103",
    },
    { city: "Bassin/Palma", locality: "Forges ", postalCode: "72501" },
    { city: "Jackson ", locality: "Ramdanee ", postalCode: "72523" },
    { city: "Bassin/Palma", locality: "Fraternite ", postalCode: "72501" },
    {
      city: "Jackson ",
      locality: "Chemin Machine (south) from Palma Rd to Kalimaye Rd",
      postalCode: "72523",
    },
    { city: "Bassin/Palma", locality: "Gaby lane", postalCode: "72501" },
    { city: "Palma Junction", locality: "Sambal Lane", postalCode: "72546" },
    { city: "Bassin/Palma", locality: "Appadoo ", postalCode: "72501" },
    { city: "Bassin/Palma", locality: "Gopal Singh Lane", postalCode: "72501" },
    {
      city: "Palma Junction",
      locality: "Hospital Rd (west side from La Paix to West Lane Candos)",
      postalCode: "72546",
    },
    { city: "Bassin/Palma", locality: "Appadoo lane", postalCode: "72501" },
    { city: "Bassin/Palma", locality: "Hospital Rd", postalCode: "72501" },
    {
      city: "Palma Junction",
      locality: "Kingstone (west) from La Paix to Nehru",
      postalCode: "72546",
    },
    { city: "Bassin/Palma", locality: "Appadoo lane 1", postalCode: "72501" },
    { city: "Jackson ", locality: "Jasmin lane", postalCode: "72523" },
    {
      city: "Palma Junction",
      locality: "Palma Rd (south) from Western Boundary to Chemin Machine",
      postalCode: "72546",
    },
    { city: "Bassin/Palma", locality: " Des Roches", postalCode: "72501" },
    {
      city: "Jackson ",
      locality: "Kalimaye lane (east) from Nehru to Chemin Machine",
      postalCode: "72523",
    },
    { city: "Palma Junction", locality: "Seechurn ", postalCode: "72546" },
    { city: "Morc New Town", locality: "Pluton", postalCode: "71407" },
    {
      city: "Residence St Daniel",
      locality: "Ariane part (west)",
      postalCode: "71408",
    },
    { city: "Roches Brunes", locality: "R.Balgobin", postalCode: "71409" },
    { city: "Verger Bissambar", locality: "School lane", postalCode: "71410" },
    {
      city: "Morc New Town",
      locality: "Roches Brunes  (part) north",
      postalCode: "71407",
    },
    {
      city: "Residence St Daniel",
      locality: "South part of R.Rivet ending at Ariane",
      postalCode: "71408",
    },
    { city: "Roches Brunes", locality: "R.Rey", postalCode: "71409" },
    { city: "Vuillemin", locality: "Dupont (north side)", postalCode: "71519" },
    { city: "Morc New Town", locality: "Saturn", postalCode: "71407" },
    {
      city: "Roches Brunes",
      locality: "Allees des manguiers",
      postalCode: "71409",
    },
    { city: "Roches Brunes", locality: "Rene Goblet", postalCode: "71409" },
    {
      city: "Vuillemin",
      locality: "Dr Pepin (from Arrighi to Randabel)",
      postalCode: "71519",
    },
    { city: "Morc New Town", locality: "Spoutnik", postalCode: "71407" },
    { city: "Roches Brunes", locality: "Baboolll", postalCode: "71409" },
    {
      city: "Roches Brunes",
      locality: "S.C. Chung Ching Wah",
      postalCode: "71409",
    },
    { city: "Vuillemin", locality: "Arrighi", postalCode: "71519" },
    {
      city: "Morc VRS Chebel",
      locality: "Morc VRS Chebel",
      postalCode: "71621",
    },
    {
      city: "Roches Brunes",
      locality: "East part of Ariane from R.Brunes to R.Maingard",
      postalCode: "71409",
    },
    { city: "Roches Brunes", locality: "S.K.Chady", postalCode: "71409" },
    { city: "Vuillemin", locality: "D.Khodabacus", postalCode: "71519" },
    { city: "NHDC Vuillemin", locality: "NHDC Vuillemin", postalCode: "71517" },
    {
      city: "Roches Brunes",
      locality: "Esprit Dennemont",
      postalCode: "71409",
    },
    { city: "Roches Brunes", locality: "Y.Forget", postalCode: "71409" },
    { city: "Vuillemin", locality: "M.Vishnu Temple", postalCode: "71519" },
    { city: "Palm Plaza", locality: "Palm Plaza", postalCode: "71518" },
    { city: "Roches Brunes", locality: "Francois LIM", postalCode: "71409" },
    {
      city: "Roches Brunes",
      locality: "Sevremont (part)",
      postalCode: "71519",
    },
    { city: "Vuillemin", locality: "A.N. Solim", postalCode: "71519" },
    { city: "Panorama", locality: "Panorama Lane", postalCode: "71622" },
    { city: "Roches Brunes", locality: "Independence", postalCode: "71409" },
    {
      city: "Roches Brunes",
      locality: "Dupont (north side)",
      postalCode: "71519",
    },
    { city: "Vuillemin", locality: "Imp J.Koenig", postalCode: "71519" },
    { city: "Panorama", locality: "Colfin", postalCode: "71622" },
    { city: "Roches Brunes", locality: "Jacmin", postalCode: "71409" },
    {
      city: "Roches Brunes",
      locality: "Ravi Shankar (one side)",
      postalCode: "71519",
    },
    { city: "Vuillemin", locality: "Hossenally Street", postalCode: "71519" },
    {
      city: "Morc New Town",
      locality: "Independence (part) southern side",
      postalCode: "71407",
    },
    { city: "Panorama", locality: "Caboche", postalCode: "71622" },
    { city: "Roches Brunes", locality: "Jaumdally", postalCode: "71409" },
    {
      city: "Roches Brunes",
      locality: "Pepin (small part-one side)",
      postalCode: "71519",
    },
    { city: "Vuillemin", locality: "Donat Lane", postalCode: "71519" },
    { city: "Morc New Town", locality: "Andrew", postalCode: "71407" },
    { city: "Panorama", locality: "Ng Wan Hing", postalCode: "71622" },
    { city: "Roches Brunes", locality: "M.Raffray", postalCode: "71409" },
    { city: "Saint Martin", locality: "Saint Martin", postalCode: "90705" },
    { city: "Vuillemin", locality: "Randabel (west)", postalCode: "71519" },
    { city: "Morc New Town", locality: "Armstrong", postalCode: "71407" },
    { city: "Panorama", locality: "A. Bernon Lane", postalCode: "71622" },
    { city: "Roches Brunes", locality: "M.Vythilingum", postalCode: "71409" },
    {
      city: "Verger Bissambar",
      locality: "Part of R.Rivet",
      postalCode: "71410",
    },
    {
      city: "Vuillemin",
      locality: "Ravi Shankar (west side)",
      postalCode: "71519",
    },
    { city: "Morc New Town", locality: "Halley", postalCode: "71407" },
    {
      city: "Panorama",
      locality: "Royal Rd from Panorama to Bernon",
      postalCode: "71622",
    },
    { city: "Roches Brunes", locality: "Marly", postalCode: "71409" },
    {
      city: "Verger Bissambar",
      locality: "Verger Bissambar Lane",
      postalCode: "71410",
    },
    { city: "Vuillemin", locality: "Vuillemin Street", postalCode: "71519" },
    { city: "Morc New Town", locality: "Jupiter", postalCode: "71407" },
    { city: "Police Flats 1", locality: "Police Flats 1", postalCode: "71623" },
    {
      city: "Roches Brunes",
      locality: "North side of Roches Brunes  up to Ariane",
      postalCode: "71409",
    },
    { city: "Verger Bissambar", locality: "P.Boodhram", postalCode: "71410" },
    {
      city: "Morc New Town",
      locality: "L'Independence (part)",
      postalCode: "71407",
    },
    { city: "Police Flats 2", locality: "Police Flats 2", postalCode: "71624" },
    {
      city: "Roches Brunes",
      locality: "P.Henessy from R.Brunes to R.Maingard",
      postalCode: "71409",
    },
    { city: "Verger Bissambar", locality: "Imp Bharati", postalCode: "71410" },
    { city: "Morc New Town", locality: "Mars", postalCode: "71407" },
    {
      city: "Residence St Daniel",
      locality: "L' Independence part (northern)",
      postalCode: "71408",
    },
    { city: "Roches Brunes", locality: "Pere Arokeum", postalCode: "71409" },
    {
      city: "Verger Bissambar",
      locality: "S.M.Chellumbrum",
      postalCode: "71410",
    },
    { city: "Morc Clairmont", locality: "Castafiore", postalCode: "71611" },
    { city: "Morc La Comete", locality: "Challenger", postalCode: "71406" },
    {
      city: "LIM FAT",
      locality: "Riverside",
      postalCode: "71616",
    },
    { city: "Montreal 1", locality: "Nenuphar", postalCode: "71617" },
    { city: "Montreal 2", locality: "Datier", postalCode: "71618" },
    { city: "Morc Clairmont", locality: "Tournesol", postalCode: "71611" },
    { city: "Morc La Comete", locality: "Columbia", postalCode: "71406" },
    {
      city: "LIM FAT",
      locality: "Including ROYAL RD",
      postalCode: "71616",
    },
    {
      city: "Montreal 1",
      locality: "Marguerite (northern side)",
      postalCode: "71617",
    },
    {
      city: "Montreal 2",
      locality: "Hibiscus up to Marguerite",
      postalCode: "71618",
    },
    { city: "Mont Roches", locality: "Railway", postalCode: "71405" },
    { city: "Morc Clairmont", locality: "Vaghjee (part)", postalCode: "71611" },
    { city: "Morc La Comete", locality: "E.Aldrin", postalCode: "71406" },
    { city: "Montreal 1", locality: "Andreanum", postalCode: "71617" },
    { city: "Montreal 1", locality: "Orchidees", postalCode: "71617" },
    { city: "Montreal 2", locality: "Iris", postalCode: "71618" },
    { city: "Mont Roches", locality: "Railway", postalCode: "71405" },
    {
      city: "Hart de Keating",
      locality: "Grenade Lane",
      postalCode: "71612",
    },
    {
      city: "Morc La Comete",
      locality: "Ariane (east side)",
      postalCode: "71406",
    },
    { city: "Montreal 1", locality: "Azalees", postalCode: "71617" },
    { city: "Montreal 1", locality: "Petunia", postalCode: "71617" },
    { city: "Montreal 2", locality: "Jasmin", postalCode: "71618" },
    { city: "Mont Roches", locality: "Ramnanain Lallah", postalCode: "71405" },
    {
      city: "Hart de Keating",
      locality: "Hart de Keating Lane",
      postalCode: "71612",
    },
    { city: "Morc La Comete", locality: "Flamboyant", postalCode: "71406" },
    { city: "Montreal 1", locality: "Balsamine", postalCode: "71617" },
    { city: "Montreal 1", locality: "Roses", postalCode: "71617" },
    { city: "Montreal 2", locality: "Longanier", postalCode: "71618" },
    {
      city: "Mont Roches",
      locality: "S.Bharati (route prison)",
      postalCode: "71405",
    },
    {
      city: "Hart de Keating",
      locality: "Quinc Coromandel",
      postalCode: "71612",
    },
    {
      city: "Morc La Comete",
      locality: "Allee des Manguiers (part)",
      postalCode: "71406",
    },
    { city: "Montreal 1", locality: "Camelias", postalCode: "71617" },
    { city: "Montreal 1", locality: "Tulip", postalCode: "71617" },
    { city: "Montreal 3", locality: "Montreal 3", postalCode: "71619" },
    { city: "Mont Roches", locality: "Shellgrove", postalCode: "71405" },
    {
      city: "Hart de Keating",
      locality: "Ramjan Lane",
      postalCode: "71612",
    },
    { city: "Morc La Comete", locality: "Collins (part)", postalCode: "71406" },
    { city: "Montreal 1", locality: "Capucine", postalCode: "71617" },
    { city: "Montreal 1", locality: "Ylang-ylang", postalCode: "71617" },
    {
      city: "Montreal 4",
      locality: "Montreal 4 (Chapman Views)",
      postalCode: "71620",
    },
    { city: "Mont Roches", locality: "Small Mountain", postalCode: "71405" },
    {
      city: "Hart de Keating",
      locality: "Royal Rd from Quin Coromandel to Panorama",
      postalCode: "71612",
    },
    {
      city: "Morc La Comete",
      locality: "Glover (one side)",
      postalCode: "71406",
    },
    { city: "Montreal 1", locality: "Daffodils", postalCode: "71617" },
    { city: "Montreal 1", locality: "Zinnia", postalCode: "71617" },
    {
      city: "Morc New Town",
      locality: "Ariane (part) east",
      postalCode: "71407",
    },
    { city: "Mont Roches", locality: "Tamil Temple", postalCode: "71405" },
    { city: "Hermitage", locality: "Ceres", postalCode: "71613" },
    { city: "Morc La Comete", locality: "Jacmin (part)", postalCode: "71406" },
    { city: "Montreal 1", locality: "Dahlia", postalCode: "71617" },
    { city: "Montreal 2", locality: "Apricot", postalCode: "71618" },
    { city: "Morc New Town", locality: "Collins (part)", postalCode: "71407" },
    { city: "Mont Roches", locality: "Vetiver", postalCode: "71405" },
    {
      city: "Hermitage",
      locality: "Jupiter",
      postalCode: "71613",
    },
    {
      city: "Morc La Comete",
      locality: "Rene Maingard (part)",
      postalCode: "71406",
    },
    { city: "Montreal 1", locality: "Fuschia", postalCode: "71617" },
    { city: "Montreal 2", locality: "Avocado", postalCode: "71618" },
    { city: "Morc Avrillon", locality: "Bastien DaSilva", postalCode: "71516" },
    { city: "Hermitage", locality: "Mars", postalCode: "71613" },
    { city: "Morc La Comete", locality: "Roblet", postalCode: "71406" },
    { city: "Montreal 1", locality: "Geranium", postalCode: "71617" },
    { city: "Montreal 2", locality: "Badamier", postalCode: "71618" },
    { city: "Mont Roches", locality: "P.De Coulhac", postalCode: "71405" },
    { city: "Coromandel", locality: "Dr Ganess", postalCode: "71608" },
    { city: "Government Block", locality: "Malaria Unit", postalCode: "71404" },
    { city: "Maingard", locality: "Mahadeo BILTOO", postalCode: "71609" },
    {
      city: "Mare Gravier Ward 5",
      locality: "Sevremont (part)",
      postalCode: "71514",
    },
    { city: "Mont Roches", locality: "Bakoorising", postalCode: "71405" },
    { city: "Mont Roches", locality: "Part E.Dennemont", postalCode: "71405" },
    { city: "Coromandel", locality: "Issac Khan", postalCode: "71608" },
    { city: "Government Block", locality: "Orthopaedic", postalCode: "71404" },
    { city: "Maingard", locality: "MARTINDALE", postalCode: "71609" },
    {
      city: "Mare Gravier Ward 6",
      locality: "C.Leckning (part) Up to Marcelle L'Etang",
      postalCode: "71610",
    },
    { city: "Mont Roches", locality: "Capt Brebner", postalCode: "71405" },
    { city: "Mont Roches", locality: "Part of Glover", postalCode: "71405" },
    { city: "Cascadelle", locality: "Imp Dr Brunel", postalCode: "71509" },
    { city: "Cite Barkly", locality: "Fuschias", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Oillets", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Manguiers", postalCode: "71605" },
    { city: "Cite Chebel H.E 2", locality: "Venkatasamy", postalCode: "71606" },
    { city: "Central Prison", locality: "Central Prison", postalCode: "71402" },
    { city: "Cite Barkly", locality: "Geraniums", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Pensees", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Orangers", postalCode: "71605" },
    { city: "Cite de Rosnay", locality: "Marcel Ducasse", postalCode: "71510" },
    {
      city: "Belle Etoile",
      locality: "Middle-(Belle Etoile)",
      postalCode: "71601",
    },
    {
      city: "Chebel",
      locality: "Chebel branch road part (south)",
      postalCode: "71604",
    },
    { city: "Cite Barkly", locality: "Haendel", postalCode: "71403" },
    {
      city: "Cite Barkly",
      locality: "P.Henessy (from Maingard to Herchenroder) west side",
      postalCode: "71403",
    },
    { city: "Cite Chebel H.E 1", locality: "Palmiers", postalCode: "71605" },
    { city: "Cite de Rosnay", locality: "M De Speville", postalCode: "71510" },
    { city: "Belle Etoile", locality: "New Road", postalCode: "71601" },
    {
      city: "Chebel",
      locality: "Royal from Chebel Bch Rd to Robertson",
      postalCode: "71604",
    },
    { city: "Cite Barkly", locality: "Herchenroder", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Racine", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Poiriers", postalCode: "71605" },
    { city: "Cite de Rosnay", locality: "Max Rohan", postalCode: "71510" },
    { city: "Belle Etoile", locality: "Riverside", postalCode: "71601" },
    { city: "Chebel", locality: "Imp Cheri Lienard", postalCode: "71604" },
    { city: "Cite Barkly", locality: "Hibiscus", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Remi.ollier", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Pommiers", postalCode: "71605" },
    { city: "Cite de Rosnay", locality: "Micheal Leal", postalCode: "71510" },
    { city: "Belle Etoile", locality: "Temple", postalCode: "71601" },
    { city: "Chebel", locality: "P.Baboolall", postalCode: "71604" },
    { city: "Cite Barkly", locality: "Hortensias", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Rose de bois", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Pruniers", postalCode: "71605" },
    { city: "Cite de Rosnay", locality: "Latham Koenig", postalCode: "71510" },
    { city: "Belle Etoile", locality: "Saran Villa", postalCode: "71601" },
    { city: "Chebel", locality: "Swami Dayanand (part)", postalCode: "71604" },
    { city: "Cite Barkly", locality: "Imp Schuman", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Rosiers", postalCode: "71403" },
    { city: "Cite Chebel H.E 2", locality: "Amitie", postalCode: "71606" },
    {
      city: "Cite de Rosnay",
      locality: "Venkatasamy Street",
      postalCode: "71510",
    },
    { city: "Belvedere/Cinquieme Mile", locality: "", postalCode: "71602" },
    { city: "Cite Barkly", locality: "Azalees", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Iris", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Saponnaire", postalCode: "71403" },
    { city: "Cite Chebel H.E 2", locality: "Anquetil", postalCode: "71606" },
    {
      city: "Cite de Rosnay",
      locality: "Phillipe Goupille",
      postalCode: "71510",
    },
    {
      city: "Belvedere/Cinquieme Mile",
      locality: "Belvedere Lane",
      postalCode: "71602",
    },
    { city: "Cite Barkly", locality: "Berlioz", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Jasmin", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Schuman", postalCode: "71403" },
    { city: "Cite Chebel H.E 2", locality: "D'Epinay", postalCode: "71606" },
    {
      city: "Cite de Rosnay",
      locality: "De Rosnay (southern side, part) up to Esaie David",
      postalCode: "71510",
    },
    {
      city: "Belvedere/Cinquieme Mile",
      locality: "Belvedere Street",
      postalCode: "71602",
    },
    { city: "Cite Barkly", locality: "Bizet", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Jean Lebrun", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Tournesol", postalCode: "71403" },
    { city: "Cite Chebel H.E 2", locality: "Dr Balgobin", postalCode: "71606" },
    {
      city: "Brown Sequard Hospital",
      locality: "Brown Sequard Hospital",
      postalCode: "71401",
    },
    { city: "Cite Barkly", locality: "Boule de neige", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Kolatiers", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Yuccas", postalCode: "71403" },
    { city: "Cite Chebel H.E 2", locality: "E.Nairac", postalCode: "71606" },
    { city: "Camp Berthelot", locality: "Camp Berthelot", postalCode: "71603" },
    { city: "Cite Barkly", locality: "Brahms", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Lauriers", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Zinnias", postalCode: "71403" },
    { city: "Cite Chebel H.E 2", locality: "Ferriere", postalCode: "71606" },
    { city: "Cascadelle", locality: "Cascadella", postalCode: "71508" },
    { city: "Cite Barkly", locality: "Corneillle", postalCode: "71403" },
    {
      city: "Cite Barkly",
      locality: "Maingard (small part)",
      postalCode: "71403",
    },
    { city: "Cite Chebec", locality: "Cite Chebec", postalCode: "71607" },
    {
      city: "Cite Chebel H.E 2",
      locality: "Independence",
      postalCode: "71606",
    },
    { city: "Cascadelle", locality: "Imp Vuillemin", postalCode: "71509" },
    { city: "Cite Barkly", locality: "Cosmos", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Mandela", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Ananas", postalCode: "71605" },
    { city: "Cite Chebel H.E 2", locality: "Pere Laval", postalCode: "71606" },
    { city: "Cascadelle", locality: "Imp Lesur", postalCode: "71509" },
    { city: "Cite Barkly", locality: "De Bourg", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Muguets", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Dattiers", postalCode: "71605" },
    { city: "Cite Chebel H.E 2", locality: "R.Rivet", postalCode: "71606" },
    { city: "Cascadelle", locality: "N.Decotter", postalCode: "71509" },
    { city: "Cite Barkly", locality: "Delphinuums", postalCode: "71403" },
    { city: "Cite Barkly", locality: "Narcisses", postalCode: "71403" },
    { city: "Cite Chebel H.E 1", locality: "Figuiers", postalCode: "71605" },
    { city: "Cite Chebel H.E 2", locality: "Rozemont", postalCode: "71606" },
    {
      city: "Beau Bassin Centre 3",
      locality: "Victor Hugo (South part)",
      postalCode: "71503",
    },
    { city: "Beau Bassin Centre 5", locality: "Dumat", postalCode: "71505" },
    { city: "Beau Bassin Centre 6", locality: "Moutia", postalCode: "71506" },
    {
      city: "Beau Bassin Centre 6",
      locality: "Victor Hugo (north part)",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 7", locality: "Latulipe", postalCode: "71507" },
    { city: "Belle Etoile", locality: "Maharishi", postalCode: "71601" },
    { city: "Beau Bassin Centre 4", locality: "Arago", postalCode: "71504" },
    {
      city: "Beau Bassin Centre 5",
      locality: "Edgar Janson",
      postalCode: "71505",
    },
    { city: "Beau Bassin Centre 6", locality: "Oshan", postalCode: "71506" },
    {
      city: "Beau Bassin Centre 6",
      locality: "Volcy Goupille",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 7", locality: "Lilas", postalCode: "71507" },
    { city: "Belle Etoile", locality: "Maurice", postalCode: "71601" },
    {
      city: "Beau Bassin Centre 4",
      locality: "Barkly Asylum Southern side",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "Gaston Vellin",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Rawat Lane",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 7", locality: "Jolivet", postalCode: "71507" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Magon de Medine",
      postalCode: "71507",
    },
    {
      city: "Beau Bassin Centre 4",
      locality: "Colonel Draper",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "Impasse Bholah",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Bougainvillea",
      postalCode: "71506",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "Trotter northern side",
      postalCode: "71507",
    },
    { city: "Beau Bassin Centre 7", locality: "Morrison", postalCode: "71507" },
    { city: "Beau Bassin Centre 4", locality: "Cossigny", postalCode: "71504" },
    { city: "Beau Bassin Centre 5", locality: "Lavoquer", postalCode: "71505" },
    { city: "Beau Bassin Centre 6", locality: "Ducray", postalCode: "71506" },
    { city: "Beau Bassin Centre 7", locality: "Beyts", postalCode: "71507" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Peerbye Street",
      postalCode: "71507",
    },
    { city: "Beau Bassin Centre 4", locality: "Josse", postalCode: "71504" },
    {
      city: "Beau Bassin Centre 5",
      locality: "Lord Byron",
      postalCode: "71505",
    },
    { city: "Beau Bassin Centre 6", locality: "Duvivier", postalCode: "71506" },
    {
      city: "Beau Bassin Centre 7",
      locality: "De La Faye",
      postalCode: "71507",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "R.P Frezia",
      postalCode: "71507",
    },
    { city: "Beau Bassin Centre 4", locality: "Leishman", postalCode: "71504" },
    {
      city: "Beau Bassin Centre 5",
      locality: "Maingard St (southern part Royal to P.Hennessy)",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Gaetan Raynal",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 7", locality: "Desai", postalCode: "71507" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Remy Ollier",
      postalCode: "71507",
    },
    {
      city: "Beau Bassin Centre 4",
      locality: "Meldrum Northern side",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "Nicolas de Cere",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Henri Lemaire",
      postalCode: "71506",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "Dupont-southern side",
      postalCode: "71507",
    },
    { city: "Beau Bassin Centre 7", locality: "Rennards", postalCode: "71507" },
    {
      city: "Beau Bassin Centre 4",
      locality: "Nappier Broome",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "Pope Hennessy (from Barkly St to Maingard st) East Side",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Major Paul Hein",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 7", locality: "Fadheuil", postalCode: "71507" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Rivalland",
      postalCode: "71507",
    },
    {
      city: "Beau Bassin Centre 3",
      locality: "L.Larcher",
      postalCode: "71503",
    },
    { city: "Beau Bassin Centre 4", locality: "Poivre", postalCode: "71504" },
    {
      city: "Beau Bassin Centre 5",
      locality: "Royal Rd (from Barkly St to Maingard) west side",
      postalCode: "71505",
    },
    { city: "Beau Bassin Centre 6", locality: "Mosque", postalCode: "71506" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Higginson",
      postalCode: "71507",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "Royal Rd-from Trotter to Dupont east side",
      postalCode: "71507",
    },
    {
      city: "Beau Bassin Centre 3",
      locality: "Lislet Geffroy",
      postalCode: "71503",
    },
    { city: "Beau Bassin Centre 4", locality: "Poivre", postalCode: "71504" },
    {
      city: "Beau Bassin Centre 5",
      locality: "Serge Alfred",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Queen Alexandra",
      postalCode: "71506",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "Impasse Bikoo",
      postalCode: "71507",
    },
    {
      city: "Belle Etoile",
      locality: "Allee Des Cocotiers",
      postalCode: "71601",
    },
    {
      city: "Beau Bassin Centre 3",
      locality: "M.Virasawmy",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 4",
      locality: "Pope Henessy (From Meldrum to Barkly East Side)",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "Shakespeare",
      postalCode: "71505",
    },
    { city: "Beau Bassin Centre 6", locality: "R E Hart", postalCode: "71506" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Impasse Du Pont",
      postalCode: "71507",
    },
    {
      city: "Belle Etoile",
      locality: "Belle Etoile Street",
      postalCode: "71601",
    },
    {
      city: "Beau Bassin Centre 3",
      locality: "Mc Irvine",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 4",
      locality: "Royal (From Barkly to Meldrum East Side)",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "St Etienne",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Royal Road (From Trotter to Duvivier) East Side",
      postalCode: "71506",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "Impasse Renards",
      postalCode: "71507",
    },
    { city: "Belle Etoile", locality: "Castle", postalCode: "71601" },
    {
      city: "Beau Bassin Centre 3",
      locality: "Odette Ernest",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 4",
      locality: "Sholto Douglas",
      postalCode: "71504",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "V Govinden",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Savrimoutou",
      postalCode: "71506",
    },
    {
      city: "Beau Bassin Centre 7",
      locality: "Impasse Rennards",
      postalCode: "71507",
    },
    {
      city: "Belle Etoile",
      locality: "Flat Mardaymootoo",
      postalCode: "71601",
    },
    {
      city: "Beau Bassin Centre 3",
      locality: "Peramblon",
      postalCode: "71503",
    },
    { city: "Beau Bassin Centre 5", locality: "Baissac", postalCode: "71505" },
    {
      city: "Beau Bassin Centre 6",
      locality: "Trotter southern side",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 6", locality: "Shand", postalCode: "71506" },
    {
      city: "Beau Bassin Centre 7",
      locality: "Lady Twining Street",
      postalCode: "71507",
    },
    { city: "Belle Etoile", locality: "Goder Lane", postalCode: "71601" },
    {
      city: "Beau Bassin Centre 3",
      locality: "Reverend Lebrun (north side from Conal to Balfour)",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 5",
      locality: "Barkly Asylum (northern part)",
      postalCode: "71505",
    },
    {
      city: "Beau Bassin Centre 6",
      locality: "Hassenjee",
      postalCode: "71506",
    },
    { city: "Beau Bassin Centre 6", locality: "Suffren", postalCode: "71506" },
    { city: "Beau Bassin Centre 7", locality: "Lane B", postalCode: "71507" },
    {
      city: "Belle Etoile",
      locality: "Impasse Belle Etoile",
      postalCode: "71601",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Montgomery",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "Royal Rd (from Rev Lebrun to Round About)",
      postalCode: "71502",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "P.Hennessy (east side) from Meldrum to De Rosnay",
      postalCode: "71501",
    },
    { city: "Beau Bassin Centre 2", locality: "Warde", postalCode: "71502" },
    {
      city: "Beau Bassin Centre 1",
      locality: "Abbe Mazuy",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Pere Laval (from Royal Rd to Morc Avrillon)",
      postalCode: "71501",
    },
    { city: "Beau Bassin Centre 3", locality: "Balfour", postalCode: "71503" },
    { city: "Beau Bassin Centre 1", locality: "Brodile", postalCode: "71501" },
    {
      city: "Beau Bassin Centre 1",
      locality: "Royal (from Pere Laval to Meldrum)",
      postalCode: "71501",
    },
    { city: "Beau Bassin Centre 3", locality: "Bethanie", postalCode: "71503" },
    {
      city: "Beau Bassin Centre 1",
      locality: "De Rosnay (Royal to Esaie David)",
      postalCode: "71501",
    },
    { city: "Beau Bassin Centre 1", locality: "Stein", postalCode: "71501" },
    {
      city: "Beau Bassin Centre 3",
      locality: "Boulevard Cowin",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "De Rosnay (from P.Hennessy to Esaie David) Northern side",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Venkatasamy Lane",
      postalCode: "71501",
    },
    { city: "Beau Bassin Centre 3", locality: "Conal", postalCode: "71503" },
    {
      city: "Beau Bassin Centre 1",
      locality: "Dessenes St",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "Abbe de la Caille",
      postalCode: "71502",
    },
    { city: "Beau Bassin Centre 3", locality: "Daffodil", postalCode: "71503" },
    { city: "Beau Bassin Centre 1", locality: "Furguson", postalCode: "71501" },
    { city: "Beau Bassin Centre 2", locality: "Arnaud", postalCode: "71502" },
    {
      city: "Beau Bassin Centre 3",
      locality: "Guy Forget",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Imp Mgr Leen",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "De Mascarenhas",
      postalCode: "71502",
    },
    {
      city: "Beau Bassin Centre 3",
      locality: "K.Jagatsingh",
      postalCode: "71503",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Imp Monneron",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "Gabriel Froppier",
      postalCode: "71502",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Imp Pere Laval",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "Louis L'Echelle",
      postalCode: "71502",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Imp Venkatasamy",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "N.G. Bestel",
      postalCode: "71502",
    },
    { city: "Beau Bassin Centre 1", locality: "Lorquet", postalCode: "71501" },
    {
      city: "Beau Bassin Centre 2",
      locality: "Promenade Roland Armand",
      postalCode: "71502",
    },
    {
      city: "Beau Bassin Centre 1",
      locality: "Meldrum (Southern Side)",
      postalCode: "71501",
    },
    { city: "Beau Bassin Centre 2", locality: "R.Goder", postalCode: "71502" },
    {
      city: "Beau Bassin Centre 1",
      locality: "Mgr Leen Street",
      postalCode: "71501",
    },
    {
      city: "Beau Bassin Centre 2",
      locality: "Raoul Lejeune",
      postalCode: "71502",
    },
    { city: "Beau Bassin Centre 1", locality: "Monneron", postalCode: "71501" },
    {
      city: "Beau Bassin Centre 2",
      locality: "Rev Lebrun (from Royal Rd to Promenade)",
      postalCode: "71502",
    },
    { city: "Grand Bois", locality: "Allee Jacques", postalCode: "60501" },
    { city: "Grand Bois", locality: "Camp Bananes", postalCode: "60502" },
    { city: "Grand Bois", locality: "College Lane", postalCode: "60503" },
    { city: "Grand Bois", locality: "Fazerally Road", postalCode: "60504" },
    { city: "Grand Bois", locality: "Accacia Grand Bois", postalCode: "R4102" },
    { city: "Grand Bois", locality: "N.H.D.C Legrand", postalCode: "60511" },
    { city: "Grand Bois", locality: "Old Savanne Rd", postalCode: "60512" },
    { city: "Grand Bois", locality: "Sewsagur Rd", postalCode: "60513" },
    { city: "Grand Bois", locality: "Young Tow", postalCode: "60514" },
    { city: "Grand Bois", locality: "Morc SIT", postalCode: "60509" },
    { city: "Grand Bois", locality: "N.H.D.C Grand Bois", postalCode: "60510" },
    { city: "Clemencia", locality: "Belle Rose", postalCode: "40701" },
    { city: "Clemencia", locality: "Clemencia", postalCode: "40702" },
    { city: "Mare D'Albert", locality: "Allee Coco", postalCode: "51001" },
    { city: "Mare D'Albert", locality: "Cite EDC", postalCode: "51002" },
    {
      city: "Mare D'Albert",
      locality: "Cite Mare D'Albert",
      postalCode: "51003",
    },
    { city: "Mare D'Albert", locality: "Gros Bois S.E", postalCode: "51004" },
    {
      city: "Mare D'Albert",
      locality: "Les Vergers de Gros Bois",
      postalCode: "51005",
    },
    { city: "Mare D'Albert", locality: "Mare D'Albert", postalCode: "51006" },
    { city: "Mare D'Albert", locality: "Morc Gokool", postalCode: "51007" },
    { city: "Mare D'Albert", locality: "Morc Grove", postalCode: "51008" },
    { city: "Mare D'Albert", locality: "Morc Piscine", postalCode: "51009" },
    { city: "Mare D'Albert", locality: "Morc Samlaul", postalCode: "51010" },
    { city: "Mare D'Albert", locality: "Morc Toolsee", postalCode: "51011" },
    { city: "Mare D'Albert", locality: "Rampe Le Moirt", postalCode: "51012" },
    {
      city: "Poudre d'Or Hamlet",
      locality: "Forbach Branch",
      postalCode: "31001",
    },
    { city: "Poudre d'Or Hamlet", locality: "Morc VRS A", postalCode: "31002" },
    { city: "Poudre d'Or Hamlet", locality: "Morc VRS B", postalCode: "31003" },
    { city: "Poudre d'Or Hamlet", locality: "Morc VRS C", postalCode: "31004" },
    { city: "Poudre d'Or Hamlet", locality: "Morc VRS D", postalCode: "31005" },
    {
      city: "Poudre d'Or Hamlet",
      locality: "Poudre D'Or Hamlet",
      postalCode: "31006",
    },
    {
      city: "L'Esperance Trebuchet",
      locality: "L'Esperance Trebuchet",
      postalCode: "30301",
    },
    {
      city: "Poudre d'Or Village",
      locality: "Bois Doiseau",
      postalCode: "30901",
    },
    { city: "L'nir", locality: "Beau Bois", postalCode: "80401" },
    { city: "L'nir", locality: "L'nir", postalCode: "80402" },
    { city: "L'Escalier", locality: "Allée Jacques", postalCode: "61401" },
    { city: "L'Escalier", locality: "Camp La Hache", postalCode: "61402" },
    { city: "L'Escalier", locality: "Camp Tagore", postalCode: "61403" },
    { city: "L'Escalier", locality: "Charles Rd", postalCode: "61404" },
    { city: "L'Escalier", locality: "Chattorgoon", postalCode: "61405" },
    { city: "L'Escalier", locality: "Cite EDC", postalCode: "61406" },
    { city: "L'Escalier", locality: "Cite Longtill", postalCode: "61407" },
    {
      city: "L'Escalier",
      locality: "Cite Paul & Virginie",
      postalCode: "61408",
    },
    { city: "L'Escalier", locality: "L'Escalier", postalCode: "61412" },
    { city: "L'Escalier", locality: "La Barraque S.E", postalCode: "61409" },
    { city: "L'Escalier", locality: "La Chapelle", postalCode: "61410" },
    { city: "L'Escalier", locality: "La Sourdine", postalCode: "61411" },
    { city: "L'Escalier", locality: "Morc Barbe", postalCode: "61413" },
    { city: "L'Escalier", locality: "Morc La Sourdine", postalCode: "61414" },
    { city: "L'Escalier", locality: "Morc Tagore", postalCode: "61415" },
    { city: "L'Escalier", locality: "Savannah", postalCode: "61416" },
    { city: "L'Escalier", locality: "Savannah S.E", postalCode: "61417" },
  ];

  // const [city, setCity] = useState("");
  // const [locality, setLocality] = useState("");
  // const [suggestions, setSuggestions] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);

  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func(...args), delay);
  //   };
  // };

  // useEffect(() => {
  //   const handleFilter = () => {
  //     if (city || locality) {
  //       const minLength = 3;
  //       const filteredSuggestions = locations.filter((location) => {
  //         const cityMatch =
  //           city.length >= minLength
  //             ? location.city.toLowerCase().includes(city.toLowerCase())
  //             : false;
  //         const localityMatch =
  //           locality.length >= minLength
  //             ? location.locality.toLowerCase().includes(locality.toLowerCase())
  //             : false;

  //         if (city && locality) {
  //           return (
  //             location.city.toLowerCase() === city.toLowerCase() &&
  //             location.locality.toLowerCase() === locality.toLowerCase()
  //           );
  //         }

  //         if (city) {
  //           return cityMatch;
  //         }

  //         if (locality) {
  //           return localityMatch;
  //         }

  //         return false;
  //       });

  //       setSuggestions(filteredSuggestions.slice(0, 3));
  //     } else {
  //       setSuggestions([]);
  //     }
  //   };

  //   const debouncedFilter = debounce(handleFilter, 300);
  //   debouncedFilter();
  // }, [city, locality]);

  // useEffect(() => {
  //   if (city || locality) {
  //     setIsSearching(true);
  //     const timeout = setTimeout(() => setIsSearching(false), 1000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [city, locality]);

  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fuse.js options for fuzzy matching
  const fuse = new Fuse(locations, {
    keys: ["city", "locality"],
    threshold: 0.3, // Adjust for leniency in matching
    includeScore: true,
  });

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const handleFilter = () => {
      if (city || locality) {
        const query = [city, locality].filter(Boolean).join(" ");
        const results = fuse.search(query);
        const filteredSuggestions = results
          .map((result) => result.item)
          .slice(0, 3);
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };

    const debouncedFilter = debounce(handleFilter, 300);
    debouncedFilter();
  }, [city, locality]);

  useEffect(() => {
    if (city || locality) {
      setIsSearching(true);
      const timeout = setTimeout(() => setIsSearching(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [city, locality]);

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg"
        style={{
          backgroundImage: "url('/img/tizardin.mu-ai-postal-1.webp')",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          overflowX: "hidden",
        }}
      ></div>

      <Row className="text-center mb-4" style={{ zIndex: 1 }}>
        <Col>
          <h1
            className="display-4 fw-bold"
            style={{ color: "#76c014", fontSize: "1.5em" }}
          >
            Tizardin AI Postal Code Finder
          </h1>
        </Col>
      </Row>

      <Row
        className="w-100 justify-content-center mb-5 spac"
        id="mob"
        style={{ zIndex: 1 }}
      >
        <Col xs={10} sm={8} md={8} lg={6}>
          <Card
            className="p-3 shadow-lg imob"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <Form>
              <Row className="gx-2 align-items-center">
                <Col xs={5} className="position-relative">
                  <Form.Group controlId="cityInput">
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="rounded-pill"
                      style={{ paddingRight: "30px" }}
                      aria-label="City input"
                    />
                    {city && (
                      <Button
                        className="close"
                        variant="link"
                        size="sm"
                        onClick={() => setCity("")}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#aaa",
                          textDecoration: "none",
                          fontSize: "1.2rem",
                        }}
                      >
                        ✕
                      </Button>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={5} className="position-relative">
                  <Form.Group controlId="localityInput">
                    <Form.Control
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="Locality"
                      className="rounded-pill"
                      style={{ paddingRight: "30px" }}
                    />
                    {locality && (
                      <Button
                        className="close"
                        variant="link"
                        size="sm"
                        onClick={() => setLocality("")}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#aaa",
                          textDecoration: "none",
                          fontSize: "1.2rem",
                        }}
                      >
                        ✕
                      </Button>
                    )}
                  </Form.Group>
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    variant="success"
                    className="rounded-pill px-2 psw"
                    onClick={() => {}}
                    style={{
                      height: "38px",
                      fontSize: "1.2rem",
                    }}
                  >
                    {isSearching ? (
                      <FontAwesomeIcon icon={faSearch} spin />
                    ) : (
                      <FontAwesomeIcon icon={faSearch} />
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      {suggestions.length > 0 && (
        <Row
          className="w-100 justify-content-center mb-4"
          style={{ zIndex: 1 }}
        >
          <Col xs={10} md={8} lg={6}>
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.postalCode}
                className="mb-3 shadow-lg res"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "10px",
                }}
              >
                <Card.Body>
                  <Card.Text>
                    <strong>City:</strong> {suggestion.city}
                  </Card.Text>
                  <Card.Text>
                    <strong>Locality:</strong> {suggestion.locality}
                  </Card.Text>
                  <Card.Text>
                    <strong>Postal Code:</strong> {suggestion.postalCode}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      <Row className="my-5 w-100 justify-content-center" style={{ zIndex: 1 }}>
        <Col xs={12} md={5} lg={4} className="mb-3">
          <Card
            className="p-4 shadow-lg hoe"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "10px",
            }}
          >
            <HowItWorks />
          </Card>
        </Col>
        <Col xs={12} md={5} lg={4} className="mb-3">
          <Card
            className="p-4  shadow-lg hoe"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "10px",
            }}
          >
            <AboutTheTool />
          </Card>
        </Col>
      </Row>

      <Footer style={{ zIndex: 1 }} />
    </Container>
  );
};

function App() {
  return (
    <div>
      <TizardinAiPostalCodeFinder />
    </div>
  );
}

export default App;
