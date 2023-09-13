
import { GymsRepository } from '../repositories/gyms-repository';
import { CheckIn, User } from "@prisma/client";
import { ResourceNotExistErro } from './errors/resource-not-exists-error';
import { getDistanceBetweenCoordinates } from '../utils/get-distance-between-coordinates';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { CheckInsRepository } from '../repositories/check-ins-repository';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';

interface ValidateCheckInUseCaseRequest {
    checkInId: string
  }
  
  interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
  }
  
  export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}
  
    async execute({
      checkInId,
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
      const checkIn = await this.checkInsRepository.findById(checkInId)
  
      if (!checkIn) {
        throw new ResourceNotExistErro()
      }
      
      const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
        checkIn.created_at,
        'minutes',
      )
  
      if (distanceInMinutesFromCheckInCreation > 20) {
        throw new LateCheckInValidationError()
      }
      
      checkIn.validate_at = new Date()
  
      await this.checkInsRepository.save(checkIn)
  
      return {
        checkIn,
      }
    }
  }