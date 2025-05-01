import { NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // Create new message entry
    const newMessage = {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject,
      message
    };

    // Path to Excel file
    const filePath = path.join(process.cwd(), 'messages.xlsx');
    
    let workbook: XLSX.WorkBook;
    try {
      // Try to read existing file
      const buffer = await fs.readFile(filePath);
      workbook = XLSX.read(buffer);
    } catch {
      // Create new workbook if file doesn't exist
      workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Messages');
    }

    // Get the first worksheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert worksheet to JSON to append new data
    const messages = XLSX.utils.sheet_to_json(worksheet);
    messages.push(newMessage);

    // Create new worksheet with updated data
    const newWorksheet = XLSX.utils.json_to_sheet(messages);
    
    // Update workbook
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

    // Write to file
    await fs.writeFile(filePath, XLSX.write(workbook, { type: 'buffer' }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}