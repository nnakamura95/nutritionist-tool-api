import { Context } from "hono";
import prisma from "../../../lib/prisma";
import {
  BadRequestError,
  NoDataError,
} from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function medicalReportGetAllById(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const clientMedicalReports = await prisma.$transaction(async (tx) => {
      return tx.medicalReport.findMany({
        where: {
          clientProfileId: id,
        },
        include: {
          bloodPressure: {
            select: {
              highestBloodPressure: true,
              lowestBloodPressure: true,
              highestBloodPressureSecond: true,
              lowestBloodPressureSecond: true,
            },
          },
          bloodTest: {
            select: {
              whiteBloodCellCount: true,
              redBloodCellCount: true,
              hemoglobinContent: true,
              hematocrit: true,
              meanCorpuscularVolume: true,
              meanCorpuscularHemoglobin: true,
              meanCorpuscularHemoglobinConcentration: true,
              bloodPlateletCount: true,
            },
          },
          bloodType: {
            select: {
              type: true,
              Rh: true,
            },
          },
          eyesight: {
            select: {
              leftEye: true,
              rightEye: true,
              leftEyeCorrection: true,
              rightEyeCorrection: true,
            },
          },
          hearing: {
            select: {
              leftEar1000hz: true,
              rightEar1000hz: true,
              medicalReportId: true,
              leftEar4000hz: true,
              rightEar4000hz: true,
            },
          },
          hepatitis: {
            select: {
              hepatitisBSurfaceAntigen: true,
              antiHepatitisBSerologic: true,
              hepatitisCAntibody: true,
            },
          },
          kidneyFunction: {
            select: {
              ureaNitrogen: true,
              creatinine: true,
              uricAcid: true,
              estimatedGlomerularFiltrationRate: true,
            },
          },
          lipidMetabolism: {
            select: {
              naturalFat: true,
              totalCholesterol: true,
              hdLCholesterol: true,
              nonHdl: true,
              ldLCholesterol: true,
            },
          },
          liverGallbladderFunction: {
            select: {
              aspartateAminotransferase: true,
              alanineTransaminase: true,
              gammaGlutamylTranspeptidase: true,
              alkalinePhosphatase: true,
              lactateDehydrogenase: true,
              totalBilirubin: true,
              totalProtein: true,
              albumin: true,
              albuminGlobulinRatio: true,
            },
          },
          stoolExamination: {
            select: {
              fecalOccultBloodLA1: true,
              fecalOccultBloodLA2: true,
            },
          },
          sugarMetabolism: {
            select: {
              bloodSugar: true,
              hba1c: true,
            },
          },
          urineGlucose: {
            select: {
              urineGlucoseQualitative: true,
              urineProteinQualitative: true,
              uricBlood: true,
              urobilinogenQualitative: true,
            },
          },
          clientProfile: {
            select: {
              dob: true,
              emailAddress: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    if (!clientMedicalReports) throw new NoDataError("No data found");

    const data = clientMedicalReports.map((clientMedicalReport) => ({
      id: clientMedicalReport.id,
      gender: clientMedicalReport.gender,
      height: clientMedicalReport.height,
      weight: clientMedicalReport.weight,
      waistCircumference: clientMedicalReport.waistCircumference,
      bodyMassIndex: clientMedicalReport.bodyMassIndex,
      comment: clientMedicalReport.comment,
      firstName: clientMedicalReport.firstName,
      lastName: clientMedicalReport.lastName,
      createdAt: clientMedicalReport.createdAt,
      updatedAt: clientMedicalReport.updatedAt,
      bloodPressure: clientMedicalReport.bloodPressure,
      eyeSight: clientMedicalReport.eyesight,
      bloodType: clientMedicalReport.bloodType,
      hearing: clientMedicalReport.hearing,
      hepatitis: clientMedicalReport.hepatitis,
      kidneyFunction: clientMedicalReport.kidneyFunction,
      lipidMetabolism: clientMedicalReport.lipidMetabolism,
      liverGallbladderFunction: clientMedicalReport.liverGallbladderFunction,
      stoolExamination: clientMedicalReport.stoolExamination,
      sugarMetabolism: clientMedicalReport.sugarMetabolism,
      dob: clientMedicalReport.clientProfile.dob,
      emailAddress: clientMedicalReport.clientProfile.emailAddress,
    }));

    return apiResponse(ctx, data);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
