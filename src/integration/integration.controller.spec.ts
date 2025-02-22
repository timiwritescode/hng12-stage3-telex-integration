import { Test, TestingModule } from "@nestjs/testing";
// import { beforeEach, describe, it } from "@jest/";
import { IntegrationController } from "./integration.controller";
import { IntegrationService } from "./integration.service";
import { MODIFIER_JSON } from "./modifier-json";
import { BadRequestException, Req, ValidationPipe } from "@nestjs/common";
import { channel } from "diagnostics_channel";
import { ModifierIntegrationRequestPayload } from "./dto/modifier-integration.dto";

describe('IntegrationController', () => {
    let integrationController: IntegrationController;
    let integrationService: IntegrationService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [IntegrationController],
            providers: [{
                provide: IntegrationService,
                useValue: {
                    getMessageRequestPayload: jest.fn()
                }
            }]
        }).compile();
         

        integrationService = moduleRef.get(IntegrationService);
        integrationController = moduleRef.get(IntegrationController)
        // moduleRef.get('APP_FILTER').useGlobalPipes(new ValidationPipe({ whitelist: true}))
    });

    describe('GET /integration.json', function ()  {
        it('should return a json to telex integration json spec', async () => {
            const result = integrationController.getModifierJson();
            
            expect(result).toEqual(MODIFIER_JSON);
        })
    })

    describe('formatMessage', () => {
        it(`should call integrationService.getMessageRequestPayload and return a formatted message`, async () => {
            const mockReqBody = {
                                message: "This is a test message", 
                                settings: [
                                    {
                                        label: "taskMessageMarker",
                                        type: "text",
                                        default: "TODO",
                                        required: true
                                    },

                                    {
                                        label: "channelID",
                                        type: "text",
                                        default: "some-channel-id",
                                        required: true
                                    }
                                ], 
                                channel_id: 'some-channel-id'};

            const mockFormatMessage = {
                event_name: "Test Message",
                message: "This is a test message",
                status: "success",
                username: "Task Bot"
            }

            jest
                .spyOn(integrationService, "getMessageRequestPayload")
                .mockResolvedValue(mockFormatMessage);

            const result = await integrationController.formatMessage(mockReqBody)
        

            expect(result).toEqual(mockFormatMessage);


        }),

        it('should throw a validation error if the request payload is invalid', async () => {
            const invalidReqBody = {
                channel_id: 'some-channeli-id',
                settings: [],
                message: 'some message'
            };

            const validationPipe = new ValidationPipe({ whitelist: true })

            await expect(
                validationPipe.transform(invalidReqBody, {type: 'body', metatype: ModifierIntegrationRequestPayload})
            )
                .rejects
                .toThrow(BadRequestException);
        })
    })
})