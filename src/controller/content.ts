import { IReqUser } from "../helper/interface";
import { Request, Response } from "express";
import Upload from "../models/upload";
import { deleteContent, viewRoleBasedContent } from "../services/content";

const contentController = {
  viewRoleBasedImgContent: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      let finalData: any[] = [];

      const userRole: string = req.params.role;
      const content = await viewRoleBasedContent(userRole, "pdf");

      if (!content || content.length === 0) {
        res.status(404).send({
          ok: false,
          message: "No content found",
        });
        return;
      }
      content.forEach((data) => {
        if (data.img) {
          finalData.push(data);
          return;
        }
      });
      res.status(200).send({
        ok: true,
        finalData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: "Error in viewing image content",
      });
    }
  },

  viewRoleBasedPdfContent: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      let finalData: any[] = [];
      const userRole: string = req.params.role;
      const content = await viewRoleBasedContent(userRole, "img");

      if (!content || content.length === 0) {
        res.status(404).send({
          ok: false,
          message: "No content found",
        });
        return;
      }
      content.forEach((data) => {
        if (data.pdf) {
          finalData.push(data);
          return;
        }
      });
      res.status(200).send({
        ok: true,
        finalData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: "Error in viewing PDF content",
      });
    }
  },

  adminDeleteContent: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const role = (req as IReqUser).user.role;
      if (role !== "admin") {
        res.status(403).send({
          ok: false,
          message: "not authorized",
        });
      }
      await deleteContent(id);
      res.status(200).send({
        ok: true,
        message: "Content deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: "Error deleting the content",
      });
    }
  },
};

export default contentController;
