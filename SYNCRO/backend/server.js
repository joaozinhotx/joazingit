const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const OpenAI = require('openai')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// OPENAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// TESTE
app.get('/', (req, res) => {
  res.json({
    status: 'online'
  })
})

// IA
app.post('/chat', async (req, res) => {

  try {

    const { mensagem } = req.body

    const resposta = await openai.chat.completions.create({

      model: 'gpt-4.1-mini',

      messages: [
        {
          role: 'system',
          content:
            'Você é a IA do SYNCRO e ajuda estudantes.'
        },

        {
          role: 'user',
          content: mensagem
        }
      ]

    })

    res.json({
      resposta: resposta.choices[0].message.content
    })

  } catch (erro) {

    console.log(erro)

    res.status(500).json({
      erro: 'Erro na IA'
    })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando 🚀')
})