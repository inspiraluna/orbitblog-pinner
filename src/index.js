import * as dotenv from 'dotenv'    
dotenv.config()
import app from './httpServer.js'

const main = async () => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => console.log(`Orbit-pinner listening on port ${PORT}`))
}
main()
export default main
