import {expect} from 'chai'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'



import {RequestWithUser} from '../src/middleware'
import {decodeToken} from '../src/utils/passwordUtility'

describe('auth middleware', ()=>{

  it('it should throw an error if token is not provided', ()=>{
    const req = {
      get(auth:string){
        return  
      }
    } 
     
    expect(()=>decodeToken(req as RequestWithUser)).to.throw('Unauthorized')
  })

  it('it should user to request object if correct token is provided', ()=>{
 
    sinon.stub(jwt, 'verify')
    jwt.verify.returns({ 
      email: 'sam@sam.com',
      _id:'12356',
      foodTypes:['vegan']
    })

    const req = {
      get(auth:string){
        return 'Bearer abcde'
      }
    } 
    const decoded = decodeToken(req as RequestWithUser)
    expect(req).to.have.property('user')
    expect(decoded).to.be.true
    jwt.verify.restore()
  })

  it('it should throw an error if correct token is not provided', ()=>{
  
    const req = {
      get(auth:string){
        return 'axvyers'
      }
    } 

    expect(()=>decodeToken(req as RequestWithUser)).to.throw()
  })

})