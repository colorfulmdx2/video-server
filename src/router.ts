import express, { Request, Response } from 'express'
export const router = express.Router()

export let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export let bloggers = [
    {id: 1, name: 'Klava Koka', author: 'youtubeUrl'},
    {id: 1, name: 'Klava Koka', author: 'youtubeUrl'},
]

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/videos', function(req, res) {
   res.send(videos);
});

router.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(videos)
})

router.get('/videos/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).send(`Bad request`)
    }
    const find = videos.find((e) => e.id === +req.params.id)
    if (!find) {
        res.status(404).send({message: `Video not found`})
    }
    res.status(200).send(find)
})

router.put('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const find = videos.find((e) => e.id === id)
    if (!find) {
        res.status(404).send({message: `Video not found`})
    }
    const { title }: any = req.body
    videos = videos.map((e: any) => {
        if (+id === e.id) {
            return {...e, title}
        }
        return e
    })
    res.send(200)
})

router.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const find = videos.find((e) => e.id === id)
    if (!find) {
        res.status(404).send({message: `Video not found`})
    }
    videos = [...videos.filter((e: any) => e.id !== +req.params.id)]
    res.status(200).send(find)
})


