import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import {router} from './router'

export let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use('/lesson_01/api', router);
app.all('*', function(req, res) {
    res.send(400)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
