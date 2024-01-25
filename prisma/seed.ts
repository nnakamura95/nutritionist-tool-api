import prisma from "../lib/prisma";


const main = async () => {
  const clientProfileList = [
    {
      firstName: "John",
      lastName: "Smith",
      dob: new Date("03/23/1990"),
      age: 33,
      emailAddress: "jsmith90@gmail.com",
      phoneNumber: "090-9009-4594",
      address: "123 Main st, apt 1, city, state, 123-0001",
    },
    {
      firstName: "Naomi",
      lastName: "Johnson",
      dob: new Date("01/23/1995"),
      age: 28,
      emailAddress: "njohnson95@outlook.com",
      phoneNumber: "080-9009-1235",
      address: "123 Main Rd, city, state, 123-0003",
    },
    {
      firstName: "John",
      lastName: "Smith",
      dob: new Date("03/23/1994"),
      age: 30,
      emailAddress: "jsmith94@yahoo.com",
      phoneNumber: "090-9009-4594",
      address: "123 Main st, apt 1, city, state, 123-0001",
    },
    {
      firstName: "Yoshimitsu",
      lastName: "Tanaka",
      dob: new Date("03/23/1997"),
      age: 26,
      emailAddress: "ytanaka97@outlook.com",
      phoneNumber: "090-9993-0234",
      address: "2-30-5 Aoba Ave, Buil 301, Roppongi, Tokyo, 032-0002",
    },
    {
      firstName: "Hiroko",
      lastName: "Otsuki",
      dob: new Date("05/12/1983"),
      age: 40,
      emailAddress: "hotsuki83@hotmail.com",
      phoneNumber: "080-4829-2347",
      address: "3-23-4 Rrinkan St, Apt 101, Zama, Kanagawa, 242-0033",
    }
  ];
  const healthReportList = [
    {
      firstName: "Hiroko",
      lastName: "Otsuki",
      gender: "Female",
      height: 170,
      weight: 70,
      waistCircumference: 70,
      bodyMassIndex: 27.3,
      eyesight: {
        leftEye: 1.0,
        rightEye: 1.0,
        leftEyeCorrection: 1.2,
        rightEyeCorrection: 1.2,
      },
      bloodPressure: {
        highestBloodPressure: 100,
        lowestBloodPressure: 90,
        highestBloodPressureSecond: 100,
        lowestBloodPressureSecond: 90,
      },
      bloodType: {
        type: "A",
        Rh: "-",
      },
      hearing: {
        leftEar1000hz: "Good",
        rightEar1000hz: "Good",
        leftEar4000hz: "Good",
        rightEar4000hz: "Good",
      },
      comment: "",
      urineGlucose: {
        urineGlucoseQualitative: "-",
        urineProteinQualitative: "-",
        uricBlood: "-",
        urobilinogenQualitative: "-",
      },
      stoolExamination: {
        fecalOccultBloodLA1: "-",
        fecalOccultBloodLA2: "-",
      },
      bloodTest: {
        whiteBloodCellCount: 2.1,
        redBloodCellCount: 2,
        hemoglobinContent: 2.1,
        hematocrit: 2.1,
        meanCorpuscularVolume: 2.1,
        meanCorpuscularHemoglobin: 2.1,
        meanCorpuscularHemoglobinConcentration: 2.1,
        bloodPlateletCount: 2.1,
      },
      liverGallbladderFunction: {
        aspartateAminotransferase: 10,
        alanineTransaminase: 10,
        gammaGlutamylTranspeptidase: 10,
        alkalinePhosphatase: 10,
        lactateDehydrogenase: 10,
        totalBilirubin: 10.1,
        totalProtein: 10.1,
        albumin: 10.1,
        albuminGlobulinRatio: 10.1,
      },
      lipidMetabolism: {
        naturalFat: 10,
        totalCholesterol: 10,
        hdLCholesterol: 10,
        nonHdl: 10,
        ldLCholesterol: 10,
      },
      kidneyFunction: {
        ureaNitrogen: 2.1,
        creatinine: 2.1,
        uricAcid: 2.1,
        estimatedGlomerularFiltrationRate: 2.1,
      },
      sugarMetabolism: {
        bloodSugar: 2.1,
        hba1c: 2.1,
      },
      hepatitis: {
        hepatitisBSurfaceAntigen: "-",
        antiHepatitisBSerologic: "-",
        hepatitisCAntibody: "-",
      }
    },
    {
      firstName: "Yoshimitsu",
      lastName: "Tanaka",
      gender: "Male",
      height: 170,
      weight: 80,
      waistCircumference: 70,
      bodyMassIndex: 27.7,
      eyesight: {
        leftEye: 0.3,
        rightEye: 0.3,
        leftEyeCorrection: 1.2,
        rightEyeCorrection: 1.2,
      },
      bloodPressure: {
        highestBloodPressure: 100,
        lowestBloodPressure: 90,
        highestBloodPressureSecond: 100,
        lowestBloodPressureSecond: 90,
      },
      bloodType: {
        type: "B",
        Rh: "+",
      },
      hearing: {
        leftEar1000hz: "Good",
        rightEar1000hz: "Good",
        leftEar4000hz: "Good",
        rightEar4000hz: "Good",
      },
      comment: "May need further examination",
      urineGlucose: {
        urineGlucoseQualitative: "-",
        urineProteinQualitative: "+",
        uricBlood: "-",
        urobilinogenQualitative: "-",
      },
      stoolExamination: {
        fecalOccultBloodLA1: "-",
        fecalOccultBloodLA2: "-",
      },
      bloodTest: {
        whiteBloodCellCount: 2.1,
        redBloodCellCount: 2,
        hemoglobinContent: 2.1,
        hematocrit: 2.1,
        meanCorpuscularVolume: 2.1,
        meanCorpuscularHemoglobin: 2.1,
        meanCorpuscularHemoglobinConcentration: 2.1,
        bloodPlateletCount: 2.1,
      },
      liverGallbladderFunction: {
        aspartateAminotransferase: 12,
        alanineTransaminase: 10,
        gammaGlutamylTranspeptidase: 12,
        alkalinePhosphatase: 10,
        lactateDehydrogenase: 12,
        totalBilirubin: 10.1,
        totalProtein: 10.1,
        albumin: 10.1,
        albuminGlobulinRatio: 10.1,
      },
      lipidMetabolism: {
        naturalFat: 10,
        totalCholesterol: 10,
        hdLCholesterol: 10,
        nonHdl: 10,
        ldLCholesterol: 10,
      },
      kidneyFunction: {
        ureaNitrogen: 2.1,
        creatinine: 2.1,
        uricAcid: 2.1,
        estimatedGlomerularFiltrationRate: 2.1,
      },
      sugarMetabolism: {
        bloodSugar: 2.1,
        hba1c: 2.1,
      },
      hepatitis: {
        hepatitisBSurfaceAntigen: "+",
        antiHepatitisBSerologic: "-",
        hepatitisCAntibody: "-",
      }
    },
  ];
  try {
    await prisma.$transaction(async (tx) => {
      for (const clientProfile of clientProfileList) {
        const existingClientProfile = await tx.clientProfile.findFirst({
          where: {
            emailAddress: clientProfile.emailAddress,
          }
        });

        if (!existingClientProfile) {
          await prisma.clientProfile.create({
            data: {
              firstName: clientProfile.firstName,
              lastName: clientProfile.lastName,
              dob: clientProfile.dob,
              age: clientProfile.age,
              emailAddress: clientProfile.emailAddress,
              phoneNumber: clientProfile.phoneNumber,
              address: clientProfile.address,
            },
          })
        }
      }

      for (const healthReport of healthReportList) {
        const existingClientProfile = await tx.clientProfile.findFirst({
          where: {
            firstName: healthReport.firstName,
            lastName: healthReport.lastName,
          },
        });

        if (!existingClientProfile) {
          return;
        }

        const existingMedicalReport = await tx.medicalReport.findFirst({
          where: {
            clientProfileId: existingClientProfile.id,
            firstName: existingClientProfile.firstName,
            lastName: existingClientProfile.lastName,
          },
        });

        if (!existingMedicalReport) {
          await tx.medicalReport.create({
            data: {
              clientProfileId: existingClientProfile.id,
              ...healthReport,
              bloodPressure: {
                create: {
                  ...healthReport.bloodPressure
                },
              },
              bloodTest: {
                create: {
                  ...healthReport.bloodTest
                },
              },
              bloodType: {
                create: {
                  ...healthReport.bloodType,
                },
              },
              eyesight: {
                create: {
                  ...healthReport.eyesight,
                },
              },
              hearing: {
                create: {
                  ...healthReport.hearing,
                },
              },
              hepatitis: {
                create: {
                  ...healthReport.hepatitis,
                },
              },
              kidneyFunction: {
                create: {
                  ...healthReport.kidneyFunction,
                },
              },
              lipidMetabolism: {
                create: {
                  ...healthReport.lipidMetabolism,
                },
              },
              liverGallbladderFunction: {
                create: {
                  ...healthReport.liverGallbladderFunction,
                },
              },
              stoolExamination: {
                create: {
                  ...healthReport.stoolExamination,
                },
              },
              sugarMetabolism: {
                create: {
                  ...healthReport.sugarMetabolism,
                },
              },
              urineGlucose: {
                create: {
                  ...healthReport.urineGlucose,
                },
              },
            }
          });
        }

      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

main();