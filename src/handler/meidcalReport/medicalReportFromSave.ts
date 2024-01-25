import { Context } from "hono";
import prisma from "../../../lib/prisma";
import {
  BadRequestError,
  NoDataError,
} from "../../../lib/errors/ApiErrors";
import {
  apiErrorResponse,
  apiResponse,
} from "../../../lib/util/apiResponses";

export default async function medicalReportFromSave(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const body = await ctx.req.json();

    if (!body) throw new BadRequestError("Data is missing");

    const healthReport = await prisma.medicalReport.findUnique({
      where: {
        id,
      },
    });
    if (!healthReport) throw new NoDataError("Medical report doesn't exist");

    const {
      firstName,
      lastName,
      height,
      weight,
      waistCircumference,
      gender,
      bmi,
      comment,
      leftEye,
      rightEye,
      leftEyeCorrection,
      rightEyeCorrection,
      highestBloodPressure,
      lowestBloodPressure,
      highestBloodPressureSecond,
      lowestBloodPressureSecond,
      bloodType,
      bloodRh,
      leftEar1000hz,
      rightEar1000hz,
      leftEar4000hz,
      rightEar4000hz,
      urineGlucoseQualitative,
      urineProteinQualitative,
      uricBlood,
      urobilinogenQualitative,
      fecalOccultBloodLA1,
      fecalOccultBloodLA2,
      whiteBloodCellCount,
      redBloodCellCount,
      hemoglobinContent,
      hematocrit,
      meanCorpuscularVolume,
      meanCorpuscularHemoglobin,
      meanCorpuscularHemoglobinConcentration,
      bloodPlateletCount,
      aspartateAminotransferase,
      alanineTransaminase,
      gammaGlutamylTranspeptidase,
      alkalinePhosphatase,
      lactateDehydrogenase,
      totalBilirubin,
      totalProtein,
      albumin,
      albuminGlobulinRatio,
      naturalFat,
      totalCholesterol,
      hdLCholesterol,
      nonHdl,
      ldLCholesterol,
      ureaNitrogen,
      creatinine,
      uricAcid,
      estimatedGlomerularFiltrationRate,
      bloodSugar,
      hba1c,
      hepatitisBSurfaceAntigen,
      antiHepatitisBSerologic,
      hepatitisCAntibody,
    } = body;

    await prisma.medicalReport.create({
      data: {
        firstName,
        lastName,
        gender,
        height,
        weight,
        waistCircumference,
        bodyMassIndex: bmi,
        eyesight: {
          create: {
            leftEye,
            rightEye,
            leftEyeCorrection,
            rightEyeCorrection,
          },
        },
        bloodPressure: {
          create: {
            highestBloodPressure,
            lowestBloodPressure,
            highestBloodPressureSecond,
            lowestBloodPressureSecond,
          },
        },
        bloodType: {
          create: {
            type: bloodType,
            Rh: bloodRh,
          },
        },
        hearing: {
          create: {
            leftEar1000hz,
            rightEar1000hz,
            leftEar4000hz,
            rightEar4000hz,
          },
        },
        comment,
        urineGlucose: {
          create: {
            urineGlucoseQualitative,
            urineProteinQualitative,
            uricBlood,
            urobilinogenQualitative,
          },
        },
        stoolExamination: {
          create: {
            fecalOccultBloodLA1,
            fecalOccultBloodLA2,
          },
        },
        bloodTest: {
          create: {
            whiteBloodCellCount,
            redBloodCellCount,
            hemoglobinContent,
            hematocrit,
            meanCorpuscularVolume,
            meanCorpuscularHemoglobin,
            meanCorpuscularHemoglobinConcentration,
            bloodPlateletCount,
          },
        },
        liverGallbladderFunction: {
          create: {
            aspartateAminotransferase,
            alanineTransaminase,
            gammaGlutamylTranspeptidase,
            alkalinePhosphatase,
            lactateDehydrogenase,
            totalBilirubin,
            totalProtein,
            albumin,
            albuminGlobulinRatio,
          },
        },
        lipidMetabolism: {
          create: {
            naturalFat,
            totalCholesterol,
            hdLCholesterol,
            nonHdl,
            ldLCholesterol,
          },
        },
        kidneyFunction: {
          create: {
            ureaNitrogen,
            creatinine,
            uricAcid,
            estimatedGlomerularFiltrationRate,
          },
        },
        sugarMetabolism: {
          create: {
            bloodSugar,
            hba1c,
          },
        },
        hepatitis: {
          create: {
            hepatitisBSurfaceAntigen,
            antiHepatitisBSerologic,
            hepatitisCAntibody,
          },
        },
        clientProfileId: id,
      },
    });

    return apiResponse(ctx);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
