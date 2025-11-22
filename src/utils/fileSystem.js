const fileSystem = {
  'Este Computador': {
    type: 'root',
    items: {
      Desktop: {
        type: 'folder',
        items: {
          'Fotos de Viagem': { 
            type: 'folder', 
            items: {
              'praia.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
              'montanha.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
              'por-do-sol.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800' }
            }
          },
          'Trabalho': { 
            type: 'folder', 
            items: {
              'relatorio.txt': { 
                type: 'text', 
                content: 'Relatório Q4 2024\n\nVendas: +35%\nMeta atingida!\n\nPalavra secreta: BANANA\n\nPróxima reunião: 15/12' 
              },
              'projetos.txt': { 
                type: 'text', 
                content: 'Projetos 2025:\n- Site novo\n- App mobile\n- Dashboard\n\nCódigo secreto: LARANJA' 
              }
            }
          },
          'Jogos': { 
            type: 'folder', 
            items: {
              'minecraft.exe': { type: 'file', content: 'Jogo não instalado' }
            }
          },
          'notas.txt': { 
            type: 'text', 
            content: 'Lembrete: comprar leite\nSenha wifi: gato123\nAniversário da Maria: 20/11' 
          }
        }
      },
      Documents: {
        type: 'folder',
        items: {
          'Receitas': { 
            type: 'folder', 
            items: {
              'bolo.txt': { 
                type: 'text', 
                content: 'Bolo de chocolate\n2 ovos\n1 xícara de açúcar\n2 xícaras de farinha\nPalavra escondida: MORANGO' 
              },
              'pizza.txt': { 
                type: 'text', 
                content: 'Pizza caseira\nMassa, molho, queijo' 
              }
            }
          },
          'Faculdade': { 
            type: 'folder', 
            items: {
              'matematica.pdf': { type: 'file', content: 'PDF de matemática' },
              'historia.txt': { 
                type: 'text', 
                content: 'Resumo de História\nSegunda Guerra Mundial\nCódigo: UVA' 
              }
            }
          },
          'curriculum.txt': { 
            type: 'text', 
            content: 'Meu Currículo\n\nNome: João Silva\nIdade: 25\nProfissão: Dev' 
          }
        }
      },
      Downloads: {
        type: 'folder',
        items: {
          'video_engraçado.mp4': { type: 'video', content: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400' },
          'musica.mp3': { type: 'audio', content: 'Audio file' },
          'instalador.exe': { type: 'file', content: 'Instalador' },
          'foto_legal.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800' }
        }
      },
      Pictures: {
        type: 'folder',
        items: {
          'wallpaper1.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920' },
          'wallpaper2.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920' },
          'wallpaper3.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920' },
          'familia.jpg': { type: 'image', content: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800' },
          'Screenshots': { 
            type: 'folder', 
            items: {
              'tela1.png': { type: 'image', content: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800' }
            }
          }
        }
      },
      Music: {
        type: 'folder',
        items: {
          'playlist.mp3': { type: 'audio', content: 'Música' }
        }
      },
      Videos: {
        type: 'folder',
        items: {
          'filme.mp4': { type: 'video', content: 'Vídeo' }
        }
      }
    }
  }
};

export default fileSystem;