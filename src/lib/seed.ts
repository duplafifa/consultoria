import { db } from './firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { Course } from '../types';

const courses: Course[] = [
  {
    id: '1',
    title: "Fundamentos da Probabilidade",
    category: "Comum",
    duration: "45 min",
    description: "Entenda os pilares matemáticos que sustentam apostas lucrativas a longo prazo.",
    instructor: "LuCanto",
    modules: [
        { id: 'm1', title: 'Módulo 1', lessons: [
            { id: 'l1', title: 'Introdução à Probabilidade', duration: '15 min', description: 'Conceitos básicos.' },
            { id: 'l2', title: 'Valor Esperado (EV)', duration: '30 min', description: 'Calculando o valor.' }
        ]}
    ]
  },
  {
    id: '2',
    title: "Análise de Escanteios na Prática",
    category: "Comum",
    duration: "1h 15min",
    description: "Aprenda a ler o fluxo de jogo e identificar oportunidades em escanteios.",
    instructor: "LuCanto",
    modules: [
        { id: 'm2', title: 'Módulo 1', lessons: [
            { id: 'l3', title: 'Fluxo de Jogo', duration: '40 min', description: 'Identificando padrões.' },
            { id: 'l4', title: 'Execução de Escanteios', duration: '35 min', description: 'Entrada e saída.' }
        ]}
    ]
  },
  {
    id: '3',
    title: "Dominando o Mercado de Gols",
    category: "Comum",
    duration: "50 min",
    description: "Estratégias avançadas para o mercado de gols, focando em padrões estatísticos.",
    instructor: "LuCanto",
    modules: [
        { id: 'm3', title: 'Módulo 1', lessons: [
            { id: 'l5', title: 'Análise Estatística', duration: '25 min', description: 'Ferramentas.' },
            { id: 'l6', title: 'Técnicas de Gols', duration: '25 min', description: 'Execução.' }
        ]}
    ]
  },
  {
    id: '4',
    title: "Leitura de Jogo em Tempo Real",
    category: "Comum",
    duration: "1h 30min",
    description: "Desenvolva a habilidade de ler o jogo em tempo real para entradas precisas.",
    instructor: "LuCanto",
    modules: [
        { id: 'm4', title: 'Módulo 1', lessons: [
            { id: 'l7', title: 'Leitura de Padrões', duration: '45 min', description: 'Visualizando jogo.' },
            { id: 'l8', title: 'Tomada de Decisão', duration: '45 min', description: 'Execução rápida.' }
        ]}
    ]
  }
];

export async function migrateCourses() {
  try {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);
    
    for (const document of snapshot.docs) {
      await setDoc(doc(db, 'courses', document.id), { ...document.data(), category: 'Comum' });
    }
    console.log('Courses migrated successfully!');
  } catch (error) {
    console.error('Error migrating courses:', error);
  }
}
